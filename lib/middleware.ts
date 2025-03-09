import withAuth from "next-auth/middleware"

export default withAuth(
	{
		callbacks: {
			authorized({ req, token }) {
				const { pathname } = req.nextUrl

				// Allow auth-related routes
				if (
					pathname.startsWith("/api/auth") ||
					pathname === "/login" ||
					pathname === "/register"
				) {
					return true
				}

				// Public routes
				if (pathname === "/" || pathname.startsWith("/api/videos")) {
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