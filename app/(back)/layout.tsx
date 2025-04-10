import NavBar from "@/components/Dashboard/NavBar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session.user;
  return (
     // Main container with horizontal scrolling enabled
    <div className="flex min-h-screen w-full overflow-x-auto ">
      
      {/* Sidebar - Fixed width, does not shrink, allows vertical scrolling */}
      <div className="w-[220px] lg:w-[280px] flex-shrink-0 overflow-y-auto">
      <Sidebar session={session} />
      </div>

      {/* Main content section (NavBar + Page Content) */}
      <div className="flex flex-col flex-grow min-w-[700px] md:min-w-0">
        
        {/* Top Navigation Bar */}
        <NavBar session={session} />

        {/* Main Content Area (Enables horizontal scrolling when necessary) */}
        <main className="flex-grow overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
