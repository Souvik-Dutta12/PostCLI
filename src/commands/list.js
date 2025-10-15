import { Command } from "commander";
import { getEndPoints } from "../utils/storage.js";
import Table from "cli-table3";
import chalk from "chalk";


export const listCommand = new Command("list")
    .description("List all saved endpoints")
    .action(
        () => {
            const endpoints = getEndPoints();
            const table = new Table({
                head: [chalk.cyan("Name"), chalk.cyan("Method"), chalk.cyan("URL")],
                colWidths: [20, 10, 70],
                wordWrap: true,
                style: { head: [], border: [] },
            });

            Object.entries(endpoints).forEach(([name, { method, url }]) => table.push([name, method, url]));

            if (Object.keys(endpoints).length === 0) {
                console.log(chalk.yellow("⚠️  No endpoints saved yet."));
            } else {
                console.log(chalk.greenBright("\n📋 Saved Endpoints:\n"));
                console.log(table.toString());
            }
        }
    )