import { Command } from "commander";
import { getEndPoints, setEndPoint } from "../utils/storage.js";
import inquirer from "inquirer";
import chalk from "chalk";

export const saveCommand = new Command("save")
    .description("Save an endpoint with a friendly name")
    .argument("<name>", "Friendly name for the endpoint")
    .argument("<method>", "HTTP method (GET, POST, PUT, DELETE, etc.)")
    .argument("<url>", "The full URL or URL with env variables")
    .action(
        async (name,method, url) => {
            const endpoints = getEndPoints();
            const validMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

            if (!validMethods.includes(method.toUpperCase()))
                return console.log(chalk.red(`❌ Invalid method '${method}'. Use one of ${validMethods.join(", ")}`));


            if (endpoints[name]) {
                const { overwrite } = await inquirer.prompt({
                    type: "confirm",
                    name: "overwrite",
                    message: `Endpoint '${name}' already exists. Overwrite?`,
                    default: false,
                });

                if (!overwrite) return console.log(chalk.yellow("⚠️  Operation cancelled."));
            }
            

            setEndPoint(name,method.toUpperCase(), url);
            console.log(chalk.greenBright(`✅ Saved '${name}' [${method.toUpperCase()}] → ${url}`));
        }
    )