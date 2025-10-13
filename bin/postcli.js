#!/usr/bin/env node

import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";

console.log(
    chalk.hex('#FF6C37').bold(
        figlet.textSync('PostCLI', { horizontalLayout: 'full' })
      )
)

const program = new Command();


program.version('1.0.0', '-v, --version', 'output the current version');

program 
  .command('hello')
  .description('Test command')
  .action(() => console.log(chalk.hex('#00A2FF')('Hello, PostCLI is working!')));

program.parse(process.argv);