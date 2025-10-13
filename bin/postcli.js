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


console.log(
    chalk.hex('#FF6C37').bold(
        figlet.textSync('PostCLI', { horizontalLayout: 'full' })
      )
)


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



program.parse(process.argv);