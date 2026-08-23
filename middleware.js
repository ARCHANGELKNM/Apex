import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  async function middleware(req) {
    // Custom logic can go here (e.g. logging)
  },
  {
    isReturnToCurrentPage: true,
    loginPage: "/api/auth/login",
  },
);

export const config = {
  // Only protect these specific folders.
  // The Homepage (/) remains public.
  matcher: ["/userDashboard/:path*", "/workspace/:path*", "/settings/:path*"],
};
