import { getPatientAppointments } from "@/actions/appointments";

import { cn } from "@/lib/utils";
import { timeAgo } from "@/utils/timeAgo";
import {
  Calendar,
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const appointments = (await getPatientAppointments(id)).data || [];
  return (
    <div className="p-4">
      <h2 className="border-b pb-3 mb-3">
        Appointments ({appointments.length.toString().padStart(2, "0")})
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {appointments.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/dashboard/doctor/appointments/view/${item.id}`}
              className={cn(
                "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900"
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
          );
        })}
      </div>
    </div>
  );
}
