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
  Mail,
  MapPin,
  User,
  X,
} from "lucide-react";
import { Appointment, UserRole } from "@prisma/client";
import { timeAgo } from "@/utils/timeAgo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PatientProps } from "@/app/(back)/dashboard/doctor/patients/layout";
import { DoctorDetail } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/generateInitials";
import ApproveBtn from "../ApproveBtn";

export default function DoctorPanel({
  doctors,
  role,
}: {
  doctors: any;
  role: UserRole;
}) {
  console.log(role);
  const pathname = usePathname();
  return (
    <ScrollArea className="h-96 w-full ">
      {doctors &&
        doctors.map((doctor: any) => {
          const status = doctor?.doctorProfile?.status ?? "PENDING";
          const initials = getInitials(doctor.name);
          const path = `/dashboard/doctors/view/${doctor.id}`;
          return (
            <Link
              href={`/dashboard/doctors/view/${doctor.id}`}
              key={doctor.id}
              // className="flex items-center gap-4 mb-6"
              className={cn(
                "flex items-center gap-4 mb-4 border  border-gray-300 shadow-sm text-xs bg-white py-3 px-2 w-full rounded-md dark:text-slate-900",
                pathname === path && "border-green-700 border-2 bg-green-50"
              )}
            >
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src={doctor.doctorProfile?.profilePicture ?? ""}
                  alt="Avatar"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {doctor.name}
                </p>
                <p className="text-sm text-muted-foreground">{doctor.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <ApproveBtn
                  status={status}
                  profileId={doctor.doctorProfile?.id ?? ""}
                />
              </div>
            </Link>
          );
        })}
    </ScrollArea>
  );
}
