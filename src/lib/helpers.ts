import { existsSync } from "fs";
import { stat, mkdir } from "fs/promises";
import { resolve } from "path"

export async function outFolder(out: string) {
    // try to locate output...
    console.log("Locating output target")
    if (existsSync(out)) {
        console.log("Output target exists; verifying that it is a directory...");
        if ((await stat(out)).isDirectory()) throw new Error(`Object ${resolve(out)} is not a directory`);
    } else {
        console.log(`Output target does not exist; creating directory ${resolve(out)}...`)
        await mkdir(out)
    }
    console.log(`Output folder: ${resolve(out)}`)
}