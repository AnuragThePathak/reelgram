import z from "zod"

export const SignUpFormSchema = z
	.object({
		name: z.string().min(2).max(255).trim(),
		email: z.string().email().trim(),
		password: z.string().min(8)
			.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
			.regex(/[0-9]/, { message: 'Contain at least one number.' })
			.regex(/[^a-zA-Z0-9]/, {
				message: 'Contain at least one special character.',
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // This ensures the error is attached to the confirmPassword field
	})

export const SignInFormSchema = z
	.object({
		email: z.string().email().trim(),
		password: z.string(),
	})