import inquirer from "inquirer";
import chalk from "chalk";
import Table from "cli-table3"

export const getTableData = async () => {
    const data = {};
    let addMore = true;

    const table = new Table({
        head: [chalk.cyan("Field"), chalk.cyan("Value"), chalk.cyan("Type")],
        style: { head: [], border: [] },
    });

    while (addMore) {
        const { key, value, isFile } = await inquirer.prompt([
            { type: "input", name: "key", message: "Enter field name:" },
            { type: "input", name: "value", message: "Enter value (path if file):" },
            { type: "confirm", name: "isFile", message: "Is this a file?" },
        ]);

        data[key] = isFile ? `file:${value}` : value;
        table.push([key, value, isFile ? "📁 File" : "🔤 Text"]);

        console.clear();
        console.log(chalk.yellowBright("\n🧾 Current Data Table:\n"));
        console.log(table.toString());

        const { more } = await inquirer.prompt({
            type: "confirm",
            name: "more",
            message: "Add another field?",
        });

        addMore = more;
    }

    console.log(chalk.green("\n✅ Final Data Captured!"));
    return data;
};
