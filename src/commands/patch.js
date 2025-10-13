import { Command } from 'commander';
import { makeRequest } from '../utils/requestHandler.js';
import inquirer from 'inquirer';

export const patchCommand = new Command('PATCH')
  .description('Make a PATCH request')
  .argument('<url>', 'URL to patch')
  .action(async (url) => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'data',
        message: 'Enter JSON body:',
        validate: input => {
          try { JSON.parse(input); return true; }
          catch { return 'Invalid JSON'; }
        }
      }
    ]);
    await makeRequest({ method: 'PATCH', url, data: JSON.parse(answers.data) });
  });
