import { authOptions } from "@/lib/auth"
import { connectToDb } from "@/lib/db"
import Video, { IVideo } from "@/models/video"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

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

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			)
		}

		const body: IVideo = await req.json()
		if (
			!body.title ||
			!body.description ||
			!body.videoUrl ||
			!body.thumbnailUrl
		) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			)
		}

		const videoData = {
			...body,
			controls: body.controls ?? true,
			transformation: {
				height: 1920,
				width: 1080,
				quality: body.transformation.quality ?? 100
			}
		}

		await connectToDb()
		const video = await Video.create(videoData)
		return NextResponse.json(video, { status: 201 })
	} catch (e) {
		console.error("Error creating video", e)
		return NextResponse.json(
			{ error: "Failed to create video." },
			{ status: 500 }
		)
	}
}