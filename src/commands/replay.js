import { Command } from "commander";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { makeRequest } from "../utils/requestHandler.js";

export const replayCommand = new Command("replay")
  .description("Replay a saved request from a JSON file")
  .argument("<filepath>", "Path to saved request JSON file")
  .action(async (filepath) => {
    try {
      const fullPath = path.resolve(filepath);

      if (!fs.existsSync(fullPath)) {
        return console.log(chalk.red(`❌ File not found: ${fullPath}`));
      }

      const raw = fs.readFileSync(fullPath, "utf-8");
      const saved = JSON.parse(raw);

      if (!saved.request) {
        return console.log(chalk.red("❌ Invalid file format: Missing 'request' object"));
      }

      const { method, url, data, headers } = saved.request;

      console.log(chalk.cyanBright(`➡️  Replaying ${method} request to ${url}`));

      await makeRequest({ method, url, data, headers });

    } catch (err) {
      console.log(chalk.red(`❌ Failed to replay request: ${err.message}`));
    }
  });
