import { env } from "@/env"
import { Notion } from ".."

export type newPositionObj = {
    name: string
}

export async function postPosition(newPositionObj:newPositionObj) {
    const createdPosition = await Notion.pages.create({
        parent: {
            database_id: env.NOTION_POSITION_TABLE_ID
        },
        properties: {
            name: {
                title: [{
                    text: {
                        content: newPositionObj.name
                    }
                }]
            },
        }
    }) as any

    return {
        id: createdPosition.id,
        name: createdPosition.properties.name.title[0].text.content
    }
}