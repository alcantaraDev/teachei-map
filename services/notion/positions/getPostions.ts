import { env } from "@/env"
import { Notion } from ".."
import { formatPositions } from "./utils"

export async function getPositions() {
    const { results } = await Notion.databases.query({
        database_id: env.NOTION_POSITION_TABLE_ID
    })

    return results.map(notionPosition => formatPositions(notionPosition))
}