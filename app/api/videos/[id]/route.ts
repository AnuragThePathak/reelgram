import { connectToDb } from "@/lib/db"
import Video from "@/models/video"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	try {
		await connectToDb()
		const video = await Video.findOne({_id: id}).lean()
		if (!video) {
			return NextResponse.json(null, { status: 200 })
		} else {
			return NextResponse.json(video, { status: 200 })
		}
	} catch (e) {
		console.error("Error fetching videos", e)
		return NextResponse.json(
			{ error: "Failed to fetch videos." },
			{ status: 500 }
		)
	}
}