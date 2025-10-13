import { Command } from 'commander';
import { makeRequest } from '../utils/requestHandler.js';

export const headCommand = new Command('HEAD')
  .description('Make a HEAD request')
  .argument('<url>', 'URL to fetch headers')
  .action(async (url) => {
    await makeRequest({ method: 'HEAD', url });
  });
