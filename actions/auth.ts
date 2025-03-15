"use server"

import { connectToDb } from "@/lib/db"
import { SignUpFormSchema } from "@/lib/form-schema"
import { SignUpFormState } from "@/lib/form-state"
import User from "@/models/user"

export async function createUser(state: SignUpFormState, formData: FormData) {
	const validatedFields = SignUpFormSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	})

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { email, name, password } = validatedFields.data

	try {
		await connectToDb()
		const existingUser = await User.findOne({ email })

		if (existingUser) {
			return {
				message: "User already exists",
			}
		}

		await User.create({
			email,
			password,
			name,
		})
		return {
			success: true
		}
	} catch (e) {
		console.error(e)
		return {
			message: "Failed to create user"
		}
	}
}