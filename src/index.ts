import { Command } from "commander";
import { readFile } from "fs/promises";
import { randomBytes } from "node:crypto"
import { outFolder } from "./lib/helpers";
import { download, getDataForSound } from "./lib/downloader";

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
        
        await outFolder(options.output) // check if output folder is Real

        let contents = await readFile(file)

        for (let x of contents.toString().split(options.separator)) {
            await download(x, options.output)
        }
        
    })
    
program.command("extract")
    .description("Get a Roblox audio's source URL")
    .argument("<string>", "Roblox asset ID for a sound")
    .action(async (str) => {
        
        console.log(await getDataForSound(str))
        
    })

program.command("download")
    .description("Download a Roblox audio")
    .argument("<string>", "Roblox asset ID for a sound")
    .action(async (str) => {
        
        await download(str, process.cwd())
        
    })

program.parse()