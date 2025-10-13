import { Command } from 'commander';
import { makeRequest } from '../utils/requestHandler.js';

export const deleteCommand = new Command('DELETE')
  .description('Make a DELETE request') 
  .argument('<url>', 'URL to delete')
  .action(async (url) => {
    await makeRequest({ method: 'DELETE', url });
  });
