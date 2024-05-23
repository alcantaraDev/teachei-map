import { getPositions } from "@/services/notion/positions/getPostions";
import { postPosition } from "@/services/notion/positions/postPosition";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

    cookies().set({name: "teachei@user-id", value: createdPosition.id})    
    return NextResponse.json(createdPosition)
}

// PUT