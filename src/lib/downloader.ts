import chalk from "chalk"
import { load } from "cheerio"
import bytes from "bytes";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function getDataForSound(id:string|number) {
    console.log(`${chalk.bold(id)} ${chalk.blueBright("GetURL")} Requesting webpage`)
    let response = await fetch(`https://www.roblox.com/library/${id}/`)

    if (!response.ok) throw new Error(`response to https://www.roblox.com/library/${id}/ returned ${response.status}`)
    console.log(`${chalk.bold(id)} ${chalk.blueBright("GetURL")} Downloading webpage`)
    
    let $ = load(await response.text())
    let url = $(".icon-play.MediaPlayerIcon").attr("data-mediathumb-url")
    let name = $(".border-bottom.item-name-container > h1").contents().text()

    if (!url) throw new Error(`url was not found for asset id ${id}`)

    return {url, name}
}

export async function download(id: string|number, outDir: string) {
    
    let data = await getDataForSound(id)
    console.log(`${chalk.bold(id)} ${chalk.blueBright("Download")} Requesting file from ${chalk.bold(data.url)}`)

    let response = await fetch(data.url)
    console.log(`${chalk.bold(id)} ${chalk.blueBright("Download")} Size: ${chalk.bold(bytes(parseInt(response.headers.get("content-length") ?? "0",10)))}`)

    let buf = await response.arrayBuffer()

    let nodebuf = Buffer.from(buf)
    let ext = 
        nodebuf.subarray(0,4).equals(Buffer.from("4F676753", "hex"))
        ? "ogg"
        : "mp3" // fuck you roblox, provide a content-type fucker

    console.log(`${chalk.bold(id)} ${chalk.blueBright("Download")} Audio type: ${chalk.bold(ext)}`)

    let fileName = `${data.name} - ${id}.${ext}`

    writeFile(join(outDir, fileName), nodebuf)
    console.log(`${chalk.bold(id)} ${chalk.blueBright("Download")} ${chalk.greenBright(`Wrote file ${join(outDir, fileName)} to disk`)}`)

}
