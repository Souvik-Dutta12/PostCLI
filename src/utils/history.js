import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

const historyPath = path.resolve("src/config/history.json");

export const initHistory = () => {
    if (!fs.existsSync(historyPath)) {
      fs.writeFileSync(historyPath, JSON.stringify([], null, 2));
      console.log("🆕 Created new history.json");
    }
  };

export const readHistory = () => {
    try {
        if(!fs.existsSync(historyPath)) initHistory();
        const raw = fs.readFileSync(historyPath,"utf-8");
        return JSON.parse(raw);
    } catch (error) {
        console.log(chalk.red("❌ Failed to read history.json"));
        return [];
    }
};
export const writeHistory = (data) => {
    try {
        fs.writeFileSync(historyPath,JSON.stringify(data,null,2));
    } catch (error) {
        console.log(chalk.red("❌ Failed to write history.json"));
    }
};
export const addHistory = (entry) => {
    const history = readHistory();
    history.push(entry);
    writeHistory(history);
};
export const clearHistory = () => writeHistory([]);
