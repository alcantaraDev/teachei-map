import { Notion } from ".."

export type position = {
    id: string,
    name: string,
    coordinates: {
        lat: number
        lng: number
    }
}

export async function putPosition(position:position) {
    const updatedPosition = await Notion.pages.update({
        page_id: position.id,
        properties: {
            name: {
                title: [{
                    text: {
                        content: position.name
                    }
                }]
            },
            lat: {
                number: position.coordinates.lat
            },
            lng: {
                number: position.coordinates.lng
            }
        }
    }) as any
    
    return {
        id: updatedPosition.id,
        name: updatedPosition.properties.name.title[0].text.content,
        coordinates: {
            lat: updatedPosition.properties.lat.number,
            lng: updatedPosition.properties.lng.number
        }
    }
}