"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { login } from "@/lib/form-handler"

export default function Page() {
	const [state, action, pending] = useActionState(login, undefined)
	const router = useRouter()

	useEffect(() => {
		if (state?.message) {
			toast.error(state.message)
		}
	}, [state?.message])

	useEffect(() => {
		if (state?.success) {
			toast.success("Login successful!")
			router.push("/")
		}
	}, [router, state?.success])

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			<form action={action} className="space-y-4">
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
				<button
					type="submit"
					disabled={pending}
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
				>
					Login
				</button>
				<p className="text-center mt-4">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="text-blue-500 hover:text-blue-600">
						Register
					</Link>
				</p>
			</form>
		</div>
	)
}