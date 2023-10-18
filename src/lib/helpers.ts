import { existsSync } from "fs";
import { stat, mkdir } from "fs/promises";
import { resolve } from "path"
import chalk from "chalk"

export async function outFolder(out: string) {
    // try to locate output...
    console.log(`${chalk.blueBright("outDir")} Locating output directory`)

    if (existsSync(out)) {

        console.log("Output target exists; verifying that it is a directory...");
        if ((await stat(out)).isDirectory()) throw new Error(`Object ${resolve(out)} is not a directory`);

    } else {

        console.log(`${chalk.blueBright("outDir")} ${chalk.bold.red("!")} Output target does not exist; creating directory ${resolve(out)}...`)
        await mkdir(out)

    }
    console.log(`${chalk.blueBright("outDir")} Output directory: ${resolve(out)}`)
}