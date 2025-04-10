import NavBar from "@/components/Dashboard/NavBar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?returnUrl=/onboarding`);
  }
  return <div className="">{children}</div>;
}
