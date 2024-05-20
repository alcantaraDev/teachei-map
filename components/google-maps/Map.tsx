"use client"

import { env } from "@/env"
import { APIProvider, Map as GoogleMap} from "@vis.gl/react-google-maps"

export type coordinates = {
    lat: number
    lng: number
}

export type MapProps = {
    center: coordinates
    zoom: number
}

export function Map({ center, zoom }:MapProps) {
    return (
        <>
        <span>key: {env.GOOGLE_MAPS_KEY}</span>
        {/* <APIProvider apiKey={env.GOOGLE_MAPS_KEY}>
            <GoogleMap
            style={{width: '90vw', height: '800px'}}
            defaultCenter={{lat: 22.54992, lng: 0}}
            defaultZoom={3}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            />
        </APIProvider> */}
        </>
    )
}