import mongoose from "mongoose"

export interface IVideo {
	_id?: mongoose.Types.ObjectId
	title: string
	description: string
	videoUrl: string
	thumbnailUrl: string
	controls?: boolean
	transformation?: {
		height: number
		width: number
		quality?: number
	}
	createdAt?: Date
	updatedAt?: Date
}

export interface IUser {
	_id?: mongoose.Types.ObjectId
	name: string
	email: string
	password: string
	createdAt?: Date
	updatedAt?: Date
}

export interface INewVideo {
	title: string
	description: string
	videoUrl: string
	thumbnailUrl: string
}