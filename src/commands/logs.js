import { Command } from "commander";
import Table from "cli-table3";
import chalk from "chalk";
import { readHistory } from "../utils/history.js";

export const logsCommand = new Command("logs")
  .description("Show detailed request logs")
  .action(() => {
    const history = readHistory();
    if (!history.length) return console.log(chalk.yellow("⚠️ No request history found."));

    const table = new Table({
      head: [
        chalk.cyan("Index"),
        chalk.cyan("Time"),
        chalk.cyan("Method"),
        chalk.cyan("URL"),
        chalk.cyan("Status"),
        chalk.cyan("Response Snippet")
      ],
      colWidths: [6, 20, 8, 50, 8, 50],
      wordWrap: true,
      style: { head: [], border: [] }
    });

    history.forEach((req, i) => {
      const statusColor = req.statusCode >= 200 && req.statusCode < 300 ? chalk.green : chalk.red;
      let snippet = JSON.stringify(req.response || {}).substring(0, 60) + '...';
      table.push([i, req.timeStamp, req.method, req.url, statusColor(req.statusCode), snippet]);
    });

    console.log(chalk.greenBright("\n📝 Request Logs\n"));
    console.log(table.toString());
  });
