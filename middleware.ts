import withAuth from "next-auth/middleware"

export default withAuth(
	{
		callbacks: {
			authorized({ req, token }) {
				const { pathname } = req.nextUrl

				// Video API routes
				if (pathname.startsWith("/api/videos")) {
					return true
				}

				// Allow auth-related routes
				if (
					// pathname.startsWith("/api/auth") ||
					pathname === "/login" ||
					pathname === "/signup"
				) {
					return true
				}

				// Public routes
				if (pathname === "/" || pathname.startsWith("/videos")) {
					return true
				}
				// All other routes require authentication
				return !!token
			}
		}
	}
)

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		"/((?!_next/static|_next/image|favicon.ico|public/).*)",
	]
}