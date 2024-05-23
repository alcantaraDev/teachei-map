export function formatPositions(notionPosition:any) {
    return {
        id: notionPosition.id,
        name: notionPosition.properties.name.title[0].text.content,
        coordinates: {
            lat: notionPosition.properties.lat.number,
            lng: notionPosition.properties.lng.number
        }
    }
}