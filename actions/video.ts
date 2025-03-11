"use server"

import { authOptions } from "@/lib/auth"
import { connectToDb } from "@/lib/db"
import Video, { IVideo } from "@/models/video"
import { getServerSession } from "next-auth"

export async function createVideo(video: IVideo) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) {
			return {
				error: "Unauthorized",
			}
		}

		if (
			!video.title ||
			!video.description ||
			!video.videoUrl ||
			!video.thumbnailUrl
		) {
			return {
				error: "Missing required fields",
			}
		}

		const videoData = {
			...video,
			controls: video.controls ?? true,
			transformation: {
				height: 1920,
				width: 1080,
				quality: video.transformation.quality ?? 100
			}
		}

		await connectToDb()
		const res = await Video.create(videoData)
		return res
	} catch (e) {
		console.error("Error creating video", e)
		return {
			error: "Failed to create video."
		}
	}
}