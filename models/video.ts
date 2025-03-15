import { IVideo } from "@/lib/types"
import mongoose from "mongoose"

export const VIDEO_DIMENSIONS = {
	HEIGHT: 1080,
	WIDTH: 1920,
} as const

const videoSchema = new mongoose.Schema<IVideo>({
	title: { type: String, required: true},
	description: { type: String, required: true },
	videoUrl: { type: String, required: true },
	thumbnailUrl: { type: String, required: true },
	controls: { type: Boolean, default: true },
	transformation: {
		height: { type: Number, default: VIDEO_DIMENSIONS.HEIGHT },
		width: { type: Number, default: VIDEO_DIMENSIONS.WIDTH },
		quality: { type: Number, min: 1, max: 100 },
	},
}, {
	timestamps: true
})

const Video = mongoose.models?.Video || mongoose.model<IVideo>("Video", videoSchema)
export default Video