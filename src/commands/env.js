import { Command } from "commander";
import { getEnv, setEnv, removeEnv } from "../utils/storage.js";
import chalk from "chalk";
import Table from "cli-table3";
import inquirer from "inquirer";

export const envCommand = new Command("env").description("Manage environment variables");

envCommand
  .command("set <key> <value>")
  .description("Set or update an environment variable")
  .action((key, value) => {
    setEnv(key, value);
    console.log(chalk.greenBright(`✅ Environment variable '${key}' set successfully!`));
  });

envCommand
  .command("get <key>")
  .description("Get value of an environment variable")
  .action((key) => {
    const env = getEnv();
    if (!env[key]) return console.log(chalk.red(`❌ '${key}' not found`));
    console.log(chalk.cyan(`${key} = ${env[key]}`));
  });

envCommand
  .command("list")
  .description("List all environment variables")
  .action(() => {
    const env = getEnv();
    const table = new Table({
      head: [chalk.cyan("Key"), chalk.cyan("Value")],
      colWidths: [25, 60],
      wordWrap: true,
      style: { head: [], border: [] },
    });

    Object.entries(env).forEach(([key, value]) => table.push([key, value]));

    if (Object.keys(env).length === 0) {
      console.log(chalk.yellow("⚠️  No environment variables set."));
    } else {
      console.log(chalk.greenBright("\n🧪 Environment Variables:\n"));
      console.log(table.toString());
    }
  });

envCommand
  .command("remove <key>")
  .description("Remove an environment variable")
  .action(async (key) => {
    const env = getEnv();
    if (!env[key]) return console.log(chalk.red(`❌ '${key}' not found`));

    const { confirm } = await inquirer.prompt({
      type: "confirm",
      name: "confirm",
      message: `Are you sure you want to remove '${key}'?`,
      default: false,
    });

    if (!confirm) return console.log(chalk.yellow("⚠️  Operation cancelled."));

    removeEnv(key);
    console.log(chalk.greenBright(`✅ Environment variable '${key}' removed successfully!`));
  });
