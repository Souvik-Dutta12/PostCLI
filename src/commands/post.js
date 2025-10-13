import { Command } from "commander";
import { makeRequest } from "../utils/requestHandler.js";
import inquirer from "inquirer";

export const postCommand = new Command('POST')
    .description('Make a POST request')
    .argument('<url>', 'URL to post to.')
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

        await makeRequest({ method: 'POST', url, data: JSON.parse(answers.data) });
    });