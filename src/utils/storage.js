import fs from "fs";
import path from "path";
import chalk from "chalk";

const configPath = path.resolve("src/config/config.json");

export const readConfig = () => {
  try {
    if (!fs.existsSync(configPath)) return { endpoints: {}, env: {} };
    const raw = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.log(chalk.red("❌ Failed to read config.json"));
    return { endpoints: {}, env: {} };
  }
};

export const writeConfig = (data) => {
  try {
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(chalk.red("❌ Failed to write config.json"));
  }
};

// ===== Endpoints =====
export const getEndPoints = () => readConfig().endpoints;

export const setEndPoint = (name,method, url) => {
  const config = readConfig();
  config.endpoints[name] = {method,url};
  writeConfig(config);
};

export const removeEndPoint = (name) => {
  const config = readConfig();
  delete config.endpoints[name];
  writeConfig(config);
};

// ===== Environment =====
export const getEnv = () => readConfig().env;

export const setEnv = (key, value) => {
  const config = readConfig();
  config.env[key] = value;
  writeConfig(config);
};

export const removeEnv = (key) => {
  const config = readConfig();
  delete config.env[key];
  writeConfig(config);
};

export const resolveEnvVars = (input) => {
  const env = getEnv();
  let output = input;
  Object.entries(env).forEach(([key,value]) => {
    const regex = new RegExp(`{{${key}}}`,"g");
    output = output.replace(regex, value);
  });
  return output;
};