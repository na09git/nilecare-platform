import { getServices } from "@/actions/services";
import Footer from "@/components/Frontend/Footer";
import MegaMenu from "@/components/Frontend/MegaMenu";
import Navbar from "@/components/Frontend/Navbar";
import { SiteHeader } from "@/components/site-header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="">{children}</div>;
}
