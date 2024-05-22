"use client"

import { AdvancedMarker, Marker, Pin } from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react"
import { coordinates } from "./@types"

export type UserPositionProps = {

}

export function UserPosition() {
    const [ position, setPosition ] = useState<coordinates>({
        lat: -10.926477432250977, 
        lng: -37.07320022583008
    })
    useEffect(() => {
        const watcher = navigator.geolocation.watchPosition(
        (pos) => {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
        },
        (error) => {
            console.error(error)
        })
    }, [])

    function handleClick() {
        setPosition({
            lat: -10.915518031929812, 
            lng: -37.06402163848389
        })
    }

    return (
        <Marker
          position={position}
          clickable={true}
          onClick={handleClick}
          title={'Sua Posição'}
        />
        // <AdvancedMarker
        // position={position}
        // title={'Sua Posição'}
        // >
        //     <Pin
        //     background={'#22ccff'}
        //     borderColor={'#1e89a1'}
        //     glyphColor={'#0f677a'}
        //     />
        // </AdvancedMarker>
    )
}