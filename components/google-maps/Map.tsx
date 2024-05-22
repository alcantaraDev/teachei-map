"use client"

import { env } from "@/env"
import { APIProvider, Map as GoogleMap} from "@vis.gl/react-google-maps"
import { ReactNode } from "react"
import { coordinates } from "./@types"

export type MapProps = {
    children?: ReactNode
    classname?: string
    defaultCenter: coordinates
    zoom: number
}

export function Map({ classname, defaultCenter, zoom, children }:MapProps) {
    return (
        <>
            <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
                <GoogleMap
                className={classname}
                defaultCenter={defaultCenter}
                defaultZoom={zoom}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                >
                    { children }
                </GoogleMap>
            </APIProvider>
        </>
    )
}