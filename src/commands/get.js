// src/commands/get.js
import { Command } from "commander";
import chalk from "chalk";
import axios from "axios";
import { resolveEnvVars, getEndPoints } from "../utils/storage.js";
import { makeRequest } from "../utils/requestHandler.js";

export const getCommand = new Command("GET")
  .description("Send a GET request to a URL or saved endpoint")
  .argument("<url_or_name...>")
  .action(async (inputs) => {
    const input = inputs.join(""); // join all parts into one string
    const endpoints = getEndPoints();
    const endpoint = endpoints[input];
  
    let url = endpoint ? endpoint.url : input;
    url = resolveEnvVars(url); // 🪄 Replace {{VAR}} with actual value
  
    await makeRequest({method: 'GET', url});
  });
