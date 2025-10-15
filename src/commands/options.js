import { Command } from 'commander';
import { makeRequest } from '../utils/requestHandler.js';
import { getEndPoints, resolveEnvVars } from '../utils/storage.js';

export const optionsCommand = new Command('OPTIONS')
  .description('Make an OPTIONS request')
  .argument("<url_or_name...>")
  .action(async (inputs) => {
    const input = inputs.join(""); // join all parts into one string
        const endpoints = getEndPoints();
        const endpoint = endpoints[input];
    
        let url = endpoint ? endpoint.url : input;
        url = resolveEnvVars(url); // 🪄 Replace {{VAR}} with actual value
    await makeRequest({ method: 'OPTIONS', url });
  });
