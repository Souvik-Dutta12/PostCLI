import chalk from "chalk";
import { Command } from "commander";
import { readHistory } from "../utils/history.js";
import { saveResponse } from "../utils/response.js"; // ✅ Import the function
import inquirer from "inquirer";

export const responseCommand = new Command("response")
  .description("Manage responses");

  responseCommand
  .command('save <index>')
  .description('Save response of a previous request')
  .action(async (index) => {
    const history = readHistory();
    const entry = history[index];

    if (!entry) return console.log(chalk.red('❌ Invalid index'));

    // Ask user for folder (optional) and file name
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'folder',
        message: 'Enter folder name (optional) to save response:',
        default: '',
      },
      {
        type: 'input',
        name: 'filename',
        message: 'Enter file name for response:',
        default: `response_${index}`,
      },
    ]);

    saveResponse(
      {
        method: entry.method,
        url: entry.url,
        data: entry.data || {},
        headers: entry.headers || {}
      },
      entry.response,
      answers.folder,
      answers.filename
    );
  });