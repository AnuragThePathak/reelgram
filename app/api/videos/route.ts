import { connectToDb } from "@/lib/db"
import Video from "@/models/video"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		await connectToDb()
		const videos = await Video.find().sort({ createdAt: -1 }).lean()
		if (!videos) {
			return NextResponse.json([], { status: 200 })
		} else {
			return NextResponse.json(videos, { status: 200 })
		}
	} catch (e) {
		console.error("Error fetching videos", e)
		return NextResponse.json(
			{ error: "Failed to fetch videos." },
			{ status: 500 }
		)
	}
}