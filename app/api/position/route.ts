import { getPositions } from "@/services/notion/positions/getPostions";
import { postPosition } from "@/services/notion/positions/postPosition";
import { position, putPosition } from "@/services/notion/positions/putPosition";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const userIdCookieKey = "teachei@user-id"

async function getBody(req:NextRequest) {
    try {
        return await req.json()
    } catch {
        return { error: "invalid body format" }
    }
}

export async function GET(req:NextRequest) {
    const positions = await getPositions()
    return NextResponse.json(positions)
}

export async function POST(req:NextRequest) {
    const body = await getBody(req)

    if ( body.error ) {
        return NextResponse.json({ error: "invalid request body" }, { status: 400 })
    }

    const createdPosition = await postPosition(body)

    cookies().set({name: userIdCookieKey, value: createdPosition.id})    
    return NextResponse.json(createdPosition)
}

export async function PUT(req:NextRequest) {
    const body = await getBody(req)

    if ( body.error ) {
        return NextResponse.json({ error: "invalid request body" }, { status: 400 })
    }

    const userId = cookies().get(userIdCookieKey)?.value

    if (userId != body.id) {
        return NextResponse.json({ error: "incorrect credentials" }, { status: 400 })
    }

    const updatedPosition = await putPosition(body)

    return NextResponse.json(updatedPosition)
}