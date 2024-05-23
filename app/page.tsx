'use client'

import { NameForm } from "@/components/NameForm";
import { Map } from "@/components/google-maps/Map";
import { UserPosition } from "@/components/google-maps/UserPosition";
import { position } from "@/services/notion/positions/putPosition";
import { Marker } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<position[]>([])
  const user = JSON.parse(localStorage.getItem("teachei@user") ?? "") as position

  useEffect(() => {
    axios({
      url: "/api/position",
      method: "GET"
    }).then((res) => {
      setUsers(res.data.filter((u:position) => u.id != user.id))
    })

    setInterval(() => {
      axios({
        url: "/api/position",
        method: "GET"
      }).then((res) => {
        setUsers(res.data.filter((u:position) => u.id != user.id))
      })
    }, 1000 * 60)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NameForm/>
      <Map classname="w-screen h-screen">
        <UserPosition/>
        {
          users.map((user) => (
            <Marker
            position={user.coordinates}
            title={user.name}
            />
          ))
        }
      </Map>
    </main>
  );
}
