import MeetingPage from "@/components/hms/MeetingPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  params: { roomId },
}: {
  params: { roomId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <MeetingPage roomId={roomId} session={session} />
    </div>
  );
}
