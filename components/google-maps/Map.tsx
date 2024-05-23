"use client"

import { env } from "@/env"
import { APIProvider, Map as GoogleMap} from "@vis.gl/react-google-maps"
import { ReactNode, useEffect, useState } from "react"
import { coordinates } from "./@types"

export type MapProps = {
    children?: ReactNode
    classname?: string
    defaultCenter?: coordinates
    zoom?: number
}

export function Map({ classname, defaultCenter, zoom=15, children }:MapProps) {
    const [ userPosition, setUserPosition ] = useState<coordinates>({
        lat: -10.926477432250977, 
        lng: -37.07320022583008
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
        },(error) => {
            console.error(error)
        })
    })

    return (
        <>
            <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
                <GoogleMap
                className={classname}
                defaultCenter={defaultCenter ?? userPosition}
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