"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { createUser } from "../../actions/auth"
import toast from "react-hot-toast"
import { useActionState, useEffect } from "react"

export default function Page() {
	const router = useRouter()

	const [state, action, pending] = useActionState(createUser, undefined)

	useEffect(() => {
		if (state?.success) {
			toast.success("Account created successfully")
			router.push("/login")
		}
	}, [router, state?.success])

	useEffect(() => {
		if (state?.message) {
			toast.error(state.message)
		}
	}, [state?.message])

	return (
		<div className="max-w-md mx-auto min-h-full">
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			<form action={action} className="space-y-4">
				<div>
					<label htmlFor="name" className="block mb-1">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>
				{state?.errors?.name && <p>{state.errors.name}</p>}

				<div>
					<label htmlFor="email" className="block mb-1">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>
				{state?.errors?.email && <p>{state.errors.email}</p>}

				<div>
					<label htmlFor="password" className="block mb-1">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>
				{state?.errors?.password && (
					<div>
						<p>Password must:</p>
						<ul>
							{state.errors.password.map((error) => (
								<li key={error}>- {error}</li>
							))}
						</ul>
					</div>
				)}

				<div>
					<label htmlFor="confirmPassword" className="block mb-1">
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>
				{state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}

				<button
					type="submit"
					disabled={pending}
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
				>
					Sign Up
				</button>
				<p className="text-center mt-4">
					Already have an account?{" "}
					<Link href="/login" className="text-blue-500 hover:text-blue-600">
						Login
					</Link>
				</p>
			</form>
		</div>
	)
}