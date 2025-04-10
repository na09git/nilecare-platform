import RegisterWithBg from "@/components/Auth/Register";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { role, plan } = searchParams;
  // console.log(role, plan);
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="">
      <RegisterWithBg role={role} plan={plan} />
    </div>
  );
}
