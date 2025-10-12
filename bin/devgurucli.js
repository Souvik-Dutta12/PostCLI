#!/usr/bin/env node
import { Command } from 'commander';
import figlet from 'figlet';
import chalk from 'chalk';
import projectGen from '../commands/project-gen.js';
// import gitGenius from '../commands/git-genius.js';

const program = new Command();

const showBanner = ()=>{
    console.log(
        chalk.cyan(
          figlet.textSync('Devguru CLI', { horizontalLayout: 'default' })
        )
    );
}

program
  .name('devguru')
  .description(chalk.greenBright.bold('🧠 DevGuruCLI - Smart AI Developer Toolkit'))
  .version(
    chalk.yellow('1.0.0'),      // Color the version
    '-v, --version',             // Flags
    chalk.blue('Show DevGuru CLI version') // Help description
  );

// Show banner only if no args or help
if (process.argv.length === 2 || process.argv.includes('--help') || process.argv.includes('-h')) {
  showBanner();
}


// Register commands
program.addCommand(projectGen);
// program.addCommand(gitGenius);



// Parse CLI input
program.parse(process.argv);
