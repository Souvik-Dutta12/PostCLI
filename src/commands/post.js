import { Command } from "commander";
import { makeRequest } from "../utils/requestHandler.js";
import { getTableData } from "../utils/interactiveTableInput.js";
import FormData from "form-data";
import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import { getEndPoints, resolveEnvVars } from "../utils/storage.js";

export const postCommand = new Command("POST")
  .description("Make a POST request (supports text, files, arrays, and objects)")
  .argument("<url_or_name...>")
  .action(async (inputs) => {
    console.log(chalk.cyan("\n📋 Fill in the POST request body fields:\n"));
    
    const input = inputs.join("");
    const endpoints = getEndPoints();
    const endpoint = endpoints[input];

    let data = await getTableData();

    // 🧾 Preview current data
    console.log(chalk.yellowBright("\n🧠 Current data preview:"));
    console.table(data);

    // 🔁 Ask if user wants to edit
    const { edit } = await inquirer.prompt([
      {
        type: "confirm",
        name: "edit",
        message: "Do you want to edit the data before sending?",
        default: false,
      },
    ]);

    if (edit) {
      console.log(chalk.cyan("\n✏️  Re-enter the data below:\n"));
      data = await getTableData();
      console.log(chalk.yellowBright("\n✅ Updated data:"));
      console.table(data);
    }

    // 📝 Convert data to FormData
    const form = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string" && value.startsWith("file:")) {
        const filePath = value.replace("file:", "").trim();
        if (fs.existsSync(filePath)) {
          form.append(key, fs.createReadStream(filePath));
        } else {
          console.log(chalk.red(`⚠️  File not found: ${filePath}`));
        }
      } else {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            parsed.forEach((item, i) =>
              form.append(`${key}[${i}]`, typeof item === "object" ? JSON.stringify(item) : item)
            );
          } else if (typeof parsed === "object") {
            form.append(key, JSON.stringify(parsed));
          } else {
            form.append(key, parsed);
          }
        } catch {
          form.append(key, value);
        }
      }
    }

    const headers = form.getHeaders();

    console.log(chalk.yellowBright("\n🚀 Sending POST request...\n"));

    let url = endpoint ? endpoint.url : input;
    url = resolveEnvVars(url); // 🪄 Replace {{VAR}} with actual value

    await makeRequest({
      method: "POST",
      url,
      data: form,
      headers,
    });
  });
