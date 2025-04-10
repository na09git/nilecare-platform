import LoginFormWithBg from "@/components/Auth/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { returnUrl = "/dashboard" } = searchParams;
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(returnUrl as string);
  }
  return (
    <div className="">
      <LoginFormWithBg />
    </div>
  );
}
