import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";

// Optional: fun tips during project generation
const tips = [
  "Installing dependencies...",
  "Setting up folder structure...",
  "Configuring Tailwind CSS...",
  "Initializing Git repository...",
  "Generating README.md...",
  "Almost done, just a few tweaks..."
];

const projectGen = new Command('project-gen')
  .description('Scaffold a new MERN or Next.js project')
  .option('-t, --type <stack>', 'Project type (mern, next)', 'mern')
  .action(async (options) => {
    const spinner = ora({
      text: `Starting ${options.type.toUpperCase()} project creation...`,
      spinner: 'dots'
    }).start();

    try {
      // Simulate each step with dynamic spinner text
      for (const tip of tips) {
        spinner.text = chalk.cyan(`🚀 ${tip}`);
        await new Promise(resolve => setTimeout(resolve,3000)); // simulate step
      }

      // Final success message
      spinner.succeed(chalk.green.bold(`🎉 ${options.type.toUpperCase()} project created successfully!`));
      console.log(chalk.yellow(`\n➡ Next steps:`));
      console.log(chalk.blue(`   cd my-${options.type}-project`));
      console.log(chalk.blue(`   npm install`));
      console.log(chalk.blue(`   npm run dev\n`));

    } catch (error) {
      spinner.fail(chalk.red.bold(`❌ Failed to create ${options.type} project`));
      console.error(chalk.red(error));
    }
  });

export default projectGen;
