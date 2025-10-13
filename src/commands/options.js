import { Command } from 'commander';
import { makeRequest } from '../utils/requestHandler.js';

export const optionsCommand = new Command('OPTIONS')
  .description('Make an OPTIONS request')
  .argument('<url>', 'URL to get allowed HTTP methods')
  .action(async (url) => {
    await makeRequest({ method: 'OPTIONS', url });
  });
