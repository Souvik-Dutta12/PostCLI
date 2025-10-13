import { Command } from 'commander';
import { makeRequest } from '../utils/requestHandler.js';
import inquirer from 'inquirer';

export const putCommand = new Command('PUT')
  .description('Make a PUT request')
  .argument('<url>', 'URL to update')
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

    await makeRequest({ method: 'PUT', url, data: JSON.parse(answers.data) });
  });
