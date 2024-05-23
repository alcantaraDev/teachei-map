'use client'

import axios from "axios"
import { LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function NameForm() {
    const [ visibel, setVisible ] = useState(false)
    const [ isFeching, setIsFeching ] = useState(false)
    let name = ""

    async function handleSubmit() {
        navigator.geolocation.getCurrentPosition(
        (pos) => {
            setIsFeching(true)
            axios({
                url: "/api/position",
                method: "POST",
                data: {
                    name: name,
                    coordinates: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                }
            }).then((res) => {
                localStorage.setItem("teachei@user", JSON.stringify(res.data))
                setVisible(false)
            })
        },
        (error) => {
            alert("Ops! Não consegui pegar a sua localização")
        })
    }

    useEffect(() => {
        if (!localStorage.getItem("teachei@user")) {
            setVisible(true)
        }
    }, [])

    return (
        <>
            <div
            data-visible={visibel}
            className="
            absolute z-20
            w-screen h-screen
            bg-black opacity-20
            data-[visible=false]:hidden
            "
            />
            <div
            data-visible={visibel} 
            className="
            absolute z-30
            left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  
            bg-white text-black border border-zinc-300
            grid justify-center items-center gap-2
            px-4 py-6 rounded-lg
            data-[visible=false]:hidden
            ">
                <label className="text-center" about="nome">Insira seu nome</label>
                
                <input 
                name="nome" 
                id="nome" 
                placeholder="seu nome"
                onChange={(e) => name = e.target.value }
                className="
                border-2 border-zinc-400 hover:border-zinc-500
                rounded-lg py-2 px-2
                "/>
                
                <button 
                onClick={handleSubmit}
                className="
                py-2
                bg-sky-500 text-white rounded-lg
                hover:bg-sky-600
                flex justify-center items-center
                ">
                    {
                        isFeching?
                        <LoaderCircle className="animate-spin" />:
                        "Salvar"
                    }
                </button>
            </div>
        </>
    )
}