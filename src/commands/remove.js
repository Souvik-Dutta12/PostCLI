import { Command } from "commander";
import { getEndPoints, removeEndPoint } from "../utils/storage.js";
import chalk from "chalk";
import inquirer from "inquirer";

export const removeCommand = new Command("remove")
    .description("Remove a saved endpoint")
    .argument("<name>", "Friendly name of the endpoint to remove")
    .action(
        async (name) => {
            const endpoints = getEndPoints();
            if (!endpoints[name]) {
                console.log(chalk.red(`❌ Endpoint '${name}' not found.`));
                return;
            }
            const { confirm } = await inquirer.prompt({
                type: "confirm",
                name: "confirm",
                message: `Are you sure you want to remove '${name}'?`,
                default: false,
            });
            if (!confirm) return console.log(chalk.yellow("⚠️  Operation cancelled."));
            removeEndPoint(name);
            console.log(chalk.greenBright(`✅ Endpoint '${name}' removed successfully!`));

            const remaining = Object.keys(getEndPoints());
            if (remaining.length > 0) {
                console.log(chalk.blueBright("\n📋 Remaining endpoints:"));
                remaining.forEach((n) => console.log(`- ${n}`));
            } else {
                console.log(chalk.yellow("⚠️  No endpoints left."));
            }
        }
    )