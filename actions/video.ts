"use server"

import { authOptions } from "@/lib/auth"
import { connectToDb } from "@/lib/db"
import { INewVideo } from "@/lib/types"
import Video from "@/models/video"
import { getServerSession } from "next-auth"

export async function createVideo(video: INewVideo) {
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
			controls: true,
			transformation: {
				height: 1920,
				width: 1080,
				quality: 100
			}
		}

		await connectToDb()
		const newVideo = await Video.create(videoData)
		const videoId = newVideo._id.toString()
		return { _id: videoId }
	} catch (e) {
		console.error("Error creating video", e)
		return {
			error: "Failed to create video."
		}
	}
}