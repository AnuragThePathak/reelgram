import { AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./db"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing email or password")
				}

				try {
					await connectToDb()
					const user = await User.findOne({ email: credentials.email })
					if (!user) {
						throw new Error("User does not exist")
					}

					const isValid = await bcrypt.compare(credentials.password, user.password)
					if (!isValid) {
						throw new Error("Invalid password")
					}

					return {
						id: user._id.toString(),
						email: user.email
					}
				} catch (e) {
					console.error(e)
					throw e
				}
			}
		})
	],
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60
	},
	pages: {
		signIn: "/login",
		error: "/login"
	},
	callbacks: {
		jwt: async function({token, user}) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		session: async function({session, token}) {
			session.user.id = token.id as string
			return session
		}
	}
}