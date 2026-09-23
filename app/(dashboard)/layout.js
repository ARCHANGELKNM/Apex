
import Sidebar from '@/components/nav-bar/Sidebar';
import AppTutorial from "@/components/tutorial/AppTutorial";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardGroupLayout({ children }) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login?post_login_redirect_url=/userdashboard");
  }

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] antialiased p-0 m-0 md:flex">
      <AppTutorial />
      <Sidebar user={user} />

      <main className="w-full min-w-0 overflow-x-hidden md:flex-1">
        <div className="w-full min-w-0 px-0 py-0 sm:px-2 sm:py-2 md:px-3 md:py-3">
          {children}
        </div>
      </main>
    </div>
  );
}


