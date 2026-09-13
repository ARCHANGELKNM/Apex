
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
    <div className="flex min-h-screen w-full bg-[#F9F6EE] text-black antialiased p-0 m-0">
      <AppTutorial />
      <Sidebar user={user} />

      <main className="flex-1 w-full min-w-0 overflow-x-hidden md:pl-16">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5">
          {children}
        </div>
      </main>
    </div>
  );
}


