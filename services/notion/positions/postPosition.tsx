import { env } from "@/env"
import { Notion } from ".."

export type newPositionObj = {
    name: string
    coordinates: {
        lat: number
        lng: number
    }
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
            lat: {
                number: newPositionObj.coordinates.lat
            },
            lng: {
                number: newPositionObj.coordinates.lng
            }
        }
    }) as any

    return {
        id: createdPosition.id,
        name: createdPosition.properties.name.title[0].text.content,
        coordinates: {
            lat: createdPosition.properties.lat.number,
            lng: createdPosition.properties.lng.number
        }
    }
}