import { NextResponse } from "next/server";
import { openChatApi } from "../../lib/openai"

export async function POST(req) {
    const { prompt } = await req.json()
    const res = await openChatApi(prompt)

    return NextResponse.json({
        resposta: res.choices[0].message.content
    })
}