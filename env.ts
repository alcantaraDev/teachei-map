export type envType = {
    GOOGLE_MAPS_KEY: string
} 

export const env = {
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY
} as envType