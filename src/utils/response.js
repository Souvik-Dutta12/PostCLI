import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const saveResponse = (response, name) => {
  const dirPath = path.resolve('src/responses');
  const filePath = path.join(dirPath, `${name}.json`);

  // Ensure directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(chalk.yellow(`📁 Created directory: ${dirPath}`));
  }

  // Write file
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2));
  console.log(chalk.green(`✅ Response saved to ${filePath}`));
};
