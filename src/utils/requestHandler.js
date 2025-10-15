import axios from "axios";
import boxen from "boxen";
import chalk from "chalk";
import ora from "ora";
import fs from "fs";
import { FormData, Blob } from "formdata-node";
import { fileFromPath } from "formdata-node/file-from-path";

/**
 * Make API Request with PostCLI
 * Supports GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
 * Auto-detects file uploads using "file:" prefix → multipart/form-data
 */

export const makeRequest = async ({ method, url, data = {}, headers = {} }) => {
  const spinner = ora(chalk.cyanBright(`Sending ${method} request to ${url}`)).start();

  try {
    let isFormData = false;
    let finalData = data;

    // 🧩 Build FormData only if needed
    const form = new FormData();

    for (const key in data) {
      const value = data[key];

      if (typeof value === "string" && value.startsWith("file:")) {
        // File handling
        const filePath = value.replace("file:", "").trim();
        if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);

        const file = await fileFromPath(filePath);
        form.set(key, file);
        isFormData = true;
      } else {
        try {
          // Allow arrays/objects
          const parsed = JSON.parse(value);
          form.set(key, JSON.stringify(parsed));
          isFormData = true;
        } catch {
          form.set(key, value);
        }
      }
    }

    if (isFormData) {
      finalData = form;
      headers = { ...headers, ...form.headers };
    }

    // 🌐 Axios request
    const response = await axios({
      method,
      url,
      data: finalData,
      headers,
      maxBodyLength: Infinity,
    });

    spinner.succeed(chalk.greenBright(`${method} request successful!`));

    const methodColors = {
      GET: "#00B894",
      POST: "#FFCA36",
      PUT: "#00A2FF",
      PATCH: "#9B5DE5",
      DELETE: "#FF6C37",
      OPTIONS: "#00B868",
      HEAD: "#E05DE5",
    };

    const statusColor =
      response.status >= 200 && response.status < 300 ? "#4CAF50" : "#FF3B30";

    console.log(
      boxen(
        `${chalk.hex(methodColors[method])(method)} ${chalk.bold(url)}\n` +
          `Status: ${chalk.hex(statusColor)(response.status)}\n\n` +
          `Response:\n${chalk.hex("#CCCCCC")(JSON.stringify(response.data, null, 2))}`,
        {
          padding: 1,
          borderColor: "#00B868",
          borderStyle: "round",
          title: chalk.bold.hex("#FFCA36")("📦 POSTCLI RESPONSE"),
        }
      )
    );

    return response.data;
  } catch (error) {
    spinner.fail(chalk.redBright(`${method} request failed!`));

    console.log(
      boxen(
        chalk.redBright(
          `❌ Error: ${
            error.response
              ? `${error.response.status} ${error.response.statusText}`
              : error.message
          }\n\n${
            error.response?.data
              ? JSON.stringify(error.response.data, null, 2)
              : ""
          }`
        ),
        {
          padding: 1,
          borderColor: "red",
          borderStyle: "round",
          title: chalk.bold.hex("#FF3B30")("POSTCLI ERROR"),
        }
      )
    );
  }
};
