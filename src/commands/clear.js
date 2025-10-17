import { Command } from "commander";
import chalk from "chalk";
import { clearHistory } from "../utils/history.js";

export const clearStatsCommand = new Command("clear")
  .description("Clear request history and stats")
  .action(() => {
    clearHistory();
    console.log(chalk.greenBright("✅ All history and stats cleared!"));
  });
