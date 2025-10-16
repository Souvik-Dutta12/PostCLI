import chalk from "chalk";
import { Command } from "commander";
import { readHistory } from "../utils/history.js";
import { saveResponse } from "../utils/response.js"; // ✅ Import the function

export const responseCommand = new Command("response")
  .description("Manage responses");

responseCommand
  .command("save <index> <filename>")
  .description("Save response of a previous request")
  .action((index, filename) => {
    const history = readHistory();

    // Validate index
    index = parseInt(index);
    if (isNaN(index) || index < 0 || index >= history.length) {
      console.log(chalk.red("❌ Invalid index"));
      return;
    }

    const entry = history[index];
    if (!entry || !entry.response) {
      console.log(chalk.red("❌ No response found for this entry"));
      return;
    }

    // ✅ Save the response
    saveResponse(entry.response, filename);
  });
