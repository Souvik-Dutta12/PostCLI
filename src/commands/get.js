import { Command } from "commander";
import { makeRequest } from "../utils/requestHandler.js";

export const getCommand = new Command('GET')
    .description('Make a get request')
    .argument('<url>', 'URL to fetch')
    .action(
        async (url) => {
            await makeRequest({ method: 'GET', url });
        }
    )