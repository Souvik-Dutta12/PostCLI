#!/usr/bin/env node

import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import { getCommand } from "../src/commands/get.js";
import { postCommand } from "../src/commands/post.js";
import { putCommand } from "../src/commands/put.js";
import { deleteCommand } from "../src/commands/delete.js";
import { patchCommand } from "../src/commands/patch.js";
import { headCommand } from "../src/commands/head.js";
import { optionsCommand } from "../src/commands/options.js";
import { envCommand } from "../src/commands/env.js";
import { listCommand } from "../src/commands/list.js";
import { removeCommand } from "../src/commands/remove.js";
import { saveCommand } from "../src/commands/save.js";
import { historyCommand } from "../src/commands/history.js";
import { responseCommand } from "../src/commands/response.js";
import { replayCommand } from "../src/commands/replay.js";
import { statsCommand } from "../src/commands/stats.js";
import { logsCommand } from "../src/commands/logs.js";
import { clearStatsCommand } from "../src/commands/clear.js";




const args = process.argv.slice(2);
if (
  args.length === 0 ||
  args.includes('-h') ||
  args.includes('--help') ||
  args.includes('-v') ||
  args.includes('--version')
) {
  console.log(
    chalk.hex('#FF6C37').bold(
      figlet.textSync('PostCLI', { horizontalLayout: 'full' })
    )
  );
  console.log(
    chalk.hex("#FF6C37").italic("Your powerful CLI for making HTTP requests 🚀\n")
  );
}

const program = new Command();
program.version('1.0.0', '-v, --version', 'output the current version');




//commands
program.addCommand(getCommand);
program.addCommand(postCommand);
program.addCommand(putCommand);
program.addCommand(deleteCommand);
program.addCommand(patchCommand);
program.addCommand(headCommand);
program.addCommand(optionsCommand);


program.addCommand(envCommand);
program.addCommand(listCommand);
program.addCommand(removeCommand);
program.addCommand(saveCommand);


program.addCommand(historyCommand);
program.addCommand(responseCommand);
program.addCommand(replayCommand);

program.addCommand(statsCommand);
program.addCommand(logsCommand);
program.addCommand(clearStatsCommand);

async function runCli() {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    if(error.name === "ExitPromptError") {
      console.log("\nOperation cancelled by user.");
      process.exit(0);
    } else {
      console.error(chalk.red("\nAn error occurred:"), err.message || err);
      process.exit(1); // exit with error code
    }
  }
};
runCli();