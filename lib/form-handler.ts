import { signIn } from "next-auth/react"
import { SignInFormSchema } from "./form-schema"
import { SignInFormState } from "./form-state"

export async function login(state: SignInFormState, formData: FormData) {
	const validatedFields = SignInFormSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	})

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { email, password } = validatedFields.data
	try {
		const res = await signIn("credentials", {
			email,
			password,
			redirect: false
		})

		if (res?.ok) {
			return {
				success: true
			}
		}

		if (res?.error) {
			return {
				message: res?.error
			}
		}

		return {
			message: "Failed to login"
		}
	} catch (e) {
		console.error(e)
		return {
			message: "Failed to login"
		}
	}
}
