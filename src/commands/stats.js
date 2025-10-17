import { Command } from "commander";
import { readHistory } from "../utils/history.js";
import chalk from "chalk";
import Table from 'cli-table3';

export const statsCommand = new Command("stats")
    .description("Show API usage statistics")
    .action(
        () => {
            const history = readHistory();
            if (!history.length) return console.log(chalk.yellow("⚠️ No history found."));

            const total = history.length;
            const methodsCount = {};
            let success = 0, fail = 0;

            history.forEach(req => {
                methodsCount[req.method] = (methodsCount[req.method] || 0) + 1;
                if (req.statusCode >= 200 && req.statusCode < 300) success++;
                else fail++;
            });

            console.log(chalk.greenBright("\n📊 API Usage Stats\n"));

            const table = new Table({
                head: [chalk.cyan("Metric"), chalk.cyan("Value")],
                colWidths: [25, 25],
                style: { head: [], border: [] }
            });

            table.push(
                ["Total Requests", total],
                ["Successful Requests", chalk.green(success)],
                ["Failed Requests", chalk.red(fail)]
            );

            Object.keys(methodsCount).forEach(m => {
                table.push([`${m} Requests`, methodsCount[m]]);
            });

            console.log(table.toString());
        }
    )