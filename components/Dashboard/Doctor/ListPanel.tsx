"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  CalendarCheck,
  Check,
  CircleEllipsis,
  Dot,
  History,
  X,
} from "lucide-react";
import { Appointment, UserRole } from "@prisma/client";
import { timeAgo } from "@/utils/timeAgo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ListPanel({
  appointments,
  role,
}: {
  appointments: Appointment[];
  role: UserRole;
}) {
  console.log(role);
  const pathname = usePathname();
  return (
    <ScrollArea className="h-96 w-full ">
      {appointments.map((item) => (
        <Link
          key={item.id}
          href={`/dashboard/${
            role === "USER" ? "user" : "doctor"
          }/appointments/view/${item.id}`}
          className={cn(
            "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900",
            pathname === `/dashboard/doctor/appointments/view/${item.id}` &&
              "border-green-700 border-2 bg-green-50"
          )}
        >
          <div className="flex justify-between items-center pb-2">
            <h2>
              {item.firstName} {item.lastName}
            </h2>
            <div className="flex items-center ">
              <History className="w-4 h-4 mr-2" />
              <span>{timeAgo(item.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b">
            <div className="flex items-center font-semibold">
              <CalendarCheck className="w-4 h-4 mr-2" />
              <span>{item.appointmentFormattedDate}</span>
            </div>
            <span className="font-semibold">{item.appointmentTime}</span>
          </div>
          <div
            className={cn(
              "flex items-center pt-2 text-blue-600",
              item.status === "approved" && "text-green-600 font-semibold"
            )}
          >
            {item.status === "pending" ? (
              <CircleEllipsis className="mr-2 w-4 h-4" />
            ) : item.status === "approved" ? (
              <Check className="mr-2 w-4 h-4" />
            ) : (
              <X className="mr-2 w-4 h-4" />
            )}
            <span>{item.status}</span>
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
}
