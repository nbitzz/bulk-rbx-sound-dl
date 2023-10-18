import { load } from "cheerio"

export async function getURLForSound(id:string|number) {
    let response = await fetch(`https://www.roblox.com/library/${id}/`)

    if (!response.ok) throw new Error(`response to https://www.roblox.com/library/${id}/ returned ${response.status}`)
    let $ = load(await response.text())

    return $(".icon-play.MediaPlayerIcon").attr("data-mediathumb-url")
}