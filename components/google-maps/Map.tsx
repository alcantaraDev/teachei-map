"use client"

import { env } from "@/env"
import { APIProvider, Map as GoogleMap} from "@vis.gl/react-google-maps"
import { ReactNode } from "react"

export type coordinates = {
    lat: number
    lng: number
}

export type MapProps = {
    children?: ReactNode
    center: coordinates
    zoom: number
}

export function Map({ center, zoom, children }:MapProps) {
    return (
        <>
            <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
                <GoogleMap
                style={{width: '90vw', height: '800px'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                >
                    { children }
                </GoogleMap>
            </APIProvider>
        </>
    )
}