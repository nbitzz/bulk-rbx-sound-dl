import { Command } from "commander";
import { readFile } from "fs/promises";
import { randomBytes } from "node:crypto"
import { outFolder } from "./lib/helpers";

const program = new Command()
    .name("bulk-rbx-sound-dl")
    .description("Bulk Roblox sound downloader")
    .version("1.0.0")

program.command("file")
    .description('Download Roblox sounds from IDs located in a file')
    .argument("<file>", "filename containing IDs you would like to download")
    .option("-s, --separator <char>", "character to split file on", "\n")
    .option("-o, --output <folder>", "folder to output to", `RBXSoundDownloader.${randomBytes(12).toString()}`)
    .action(async (file, options) => {
        
        outFolder(options.output) // check if output folder is Real

        let fl = await readFile(file);
        fl.toString().split(options.separator)
    })

program.parse()