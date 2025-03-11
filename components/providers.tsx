"use client"

import React from "react"
import { ImageKitProvider } from "imagekitio-next"
import { SessionProvider } from "next-auth/react"

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
const authenticator = async () => {
	try {
		const response = await fetch("/api/imagekit-auth")

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Request failed with status ${response.status}: ${errorText}`)
		}

		const { signature, expire, token } = await response.json()
		return { signature, expire, token }
	} catch (e) {
		console.error(e)
		throw new Error("Imagekit authentication request failed")
	}
}

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ImageKitProvider
				urlEndpoint={urlEndpoint}
				publicKey={publicKey}
				authenticator={authenticator}
			>
				{children}
			</ImageKitProvider>
		</SessionProvider>
	)
}