"use server"

import { REGISTER_STATUS } from "@/constants"
import { connectToDb } from "@/lib/db"
import User, { IUser } from "@/models/user"

export async function createUser(user: IUser) {
	try {
		await connectToDb()
		const existingUser = await User.findOne({ email: user.email })
		if (existingUser) {
			return REGISTER_STATUS.EMAIL_ALREADY_EXISTS
		}

		await User.create({
			email: user.email,
			password: user.password
		})
		return REGISTER_STATUS.SUCCESS
	} catch (e) {
		console.error(e)
		return REGISTER_STATUS.FAILED_TO_CREATE_USER
	}
}