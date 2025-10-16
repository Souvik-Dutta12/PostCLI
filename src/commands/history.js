import { Command } from "commander";
import chalk from "chalk";
import Table from "cli-table3";
import { makeRequest } from "../utils/requestHandler.js";
import { readHistory, clearHistory } from "../utils/history.js";

/**
 * postcli history
 * postcli history use <index>
 * postcli history clear
 */

export const historyCommand = new Command("history")
    .description("View and manage API request history")
    .option("--clear", "Clear all history entries")
    .action((options) => {
        if (options.clear) {
            clearHistory();
            return console.log(chalk.yellow("🧹 History cleared successfully."));
        }

        const history = readHistory();
        if (!history.length)
            return console.log(chalk.yellow("⚠️  No request history found."));

        const table = new Table({
            head: [
                chalk.cyan("Index"),
                chalk.cyan("Timestamp"),
                chalk.cyan("Method"),
                chalk.cyan("URL"),
                chalk.cyan("Status"),
            ],
            colWidths: [7, 25, 10, 55, 10],
            wordWrap: true,
            style: { head: [], border: [] },
        });

        history.forEach((entry, i) => {
            const color =
                entry.statusCode >= 200 && entry.statusCode < 300
                    ? chalk.green
                    : chalk.red;

            table.push([
                chalk.gray(i),
                chalk.white(new Date(entry.timestamp).toLocaleString()),
                chalk.hex(
                    {
                        GET: "#00B894",
                        POST: "#FFCA36",
                        PUT: "#00A2FF",
                        PATCH: "#9B5DE5",
                        DELETE: "#FF6C37",
                        OPTIONS: "#00B868",
                        HEAD: "#E05DE5",
                    }[entry.method] || "#CCCCCC"
                )(entry.method),
                chalk.white(entry.url),
                color(entry.statusCode || "---"),
            ]);
        });

        console.log(chalk.greenBright("\n🕒 API Request History:\n"));
        console.log(table.toString());
    });

/**
 * Reuse a previous request by index
 * Example: postcli history use 3
 */
historyCommand
    .command("use <index>")
    .description("Reuse a previous request by index")
    .action(async (index) => {
        const history = readHistory();
        const entry = history[index];

        if (!entry) return console.log(chalk.red("❌ Invalid index."));

        console.log(
            chalk.cyanBright(
                `🔁 Reusing [${entry.method}] request: ${chalk.yellow(entry.url)}`
            )
        );

        await makeRequest({
            method: entry.method,
            url: entry.url,
            data: entry.body || {},
            headers: entry.headers || {},
        });
    });

/**
 * Clear history manually
 * Example: postcli history clear
 */
historyCommand
    .command("clear")
    .description("Clear all saved request history")
    .action(() => {
        clearHistory();
        console.log(chalk.greenBright("✅ History cleared successfully!"));
    });
