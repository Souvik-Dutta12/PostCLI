import axios from "axios";
import boxen from "boxen";
import chalk from "chalk";
import ora from "ora";

/**
 * Make an HTTP request with spinner, color-coded output, and Boxen formatting
 * Supports GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
 */
export const makeRequest = async ({ method, url, data, headers }) => {
  // Start spinner
  const spinner = ora(`Sending ${method} request to ${url}`).start();

  try {
    const response = await axios({ method, url, data, headers });
    spinner.succeed(`${method} request successful!`);

    // Color codes for methods
    const methodColor = {
      GET: "#00B894",
      POST: "#FFCA36",
      PUT: "#00A2FF",
      PATCH: "#9B5DE5",
      DELETE: "#FF6C37",
      OPTIONS: "#00B868",
      HEAD: "#E05DE5",
    };

    // Status code color
    const statusColor =
      response.status >= 200 && response.status < 300 ? "#4CAF50" : "#FF3B30";

    // Handle HEAD/OPTIONS differently (headers only)
    if (method === "HEAD" || method === "OPTIONS") {
      console.log(
        boxen(
          `${chalk.hex(methodColor[method])(method)} ${chalk.bold(url)}\n` +
            `Headers:\n${chalk.hex("#CCCCCC")(
              JSON.stringify(response.headers, null, 2)
            )}`,
          { padding: 1, borderColor: "cyan", borderStyle: "round" }
        )
      );
    } else {
      // Regular requests with response data
      console.log(
        boxen(
          `${chalk.hex(methodColor[method])(method)} ${chalk.bold(url)}\n` +
            `Status: ${chalk.hex(statusColor)(response.status)}\n` +
            `Response:\n${chalk.hex("#CCCCCC")(
              JSON.stringify(response.data, null, 2)
            )}`,
          { padding: 1, borderColor: "cyan", borderStyle: "round" }
        )
      );
    }

    return response.data;
  } catch (error) {
    spinner.fail(`${method} request failed!`);

    console.log(
      boxen(
        chalk.red(
          `Error: ${
            error.response
              ? error.response.status + " " + error.response.statusText
              : error.message
          }`
        ),
        { padding: 1, borderColor: "red", borderStyle: "round" }
      )
    );
  }
};
