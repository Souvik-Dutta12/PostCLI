import fs, { existsSync } from 'fs';
import path from 'path';
import chalk from 'chalk';


export const saveResponse = (request,response,folder, name) => {

  let dirPath = path.resolve('src/responses');

  if(folder && folder.trim() !== ''){
    dirPath = path.join(dirPath, folder.trim());
    if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, {recursive: true});
  }
  const filePath = path.join(dirPath, `${name}.json`);
  const dataToSave = {
    request,
    response,
    timestamp:  new Date().toISOString()
  }
  // Write file
  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
  console.log(chalk.green(`✅ Response saved to ${filePath}`));
};
