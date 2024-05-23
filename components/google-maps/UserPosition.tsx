"use client"

import { AdvancedMarker, Marker, Pin } from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react"
import { coordinates } from "./@types"
import axios from "axios"
import { position } from "@/services/notion/positions/putPosition"

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

    useEffect(() => {
        const userString = localStorage.getItem("teachei@user")

        if (userString) {
            const user = JSON.parse(userString)
            axios({
                url: "/api/position",
                method: "PUT",
                data: {
                    id: user.id,
                    name: user.name,
                    coordinates: {
                        lat: position.lat,
                        lng: position.lng
                    }
                }
            }).then((res) => {
                localStorage.setItem("teachei@user", JSON.stringify(res.data))
            }).catch(() => {
                alert("Ops! erro ao conectar com o servidor")
            })
        }
    }, [position])

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
    )
}