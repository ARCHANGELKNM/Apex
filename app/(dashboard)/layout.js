
import Sidebar from '@/components/nav-bar/Sidebar';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardGroupLayout({ children }) {

  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

   if (!(await isAuthenticated())) {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }

  return (
    <div className="flex flex-row w-full h-screen bg-[#F9F6EE] text-black antialiased p-0 m-0 overflow-hidden">
      {/* 1. Left Edge Full-Height Sidebar Component */}
      <Sidebar user={user}/>

      <main className="flex-1 w-full overflow-y-auto min-w-0 h-full p-0">
        {/* Inner page wrapping wrapper handles the text buffer safely */}
        <div className="p-6 md:p-8 max-w-5xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}


