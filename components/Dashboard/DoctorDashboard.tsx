import React from "react";
import AnalyticsCard from "../AnalyticsCard";
import { Session } from "next-auth";
import { getDoctorAnalytics } from "@/actions/stats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PatientProps } from "@/app/(back)/dashboard/doctors/layout";
import {
  getDoctorAppointments,
  getPatientAppointments,
} from "@/actions/appointments";
import Link from "next/link";
import { getInitials } from "@/utils/generateInitials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/utils/timeAgo";
import {
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  RefreshCcw,
  X,
} from "lucide-react";
import { getDoctorProfileById } from "@/actions/onboarding";
export default async function DoctorDashboard({
  session,
}: {
  session: Session | null;
}) {
  const user = session?.user;
  const doctorId = user?.id ?? "";
  const doctorProfile = (await getDoctorProfileById(doctorId))?.data;
  const analytics = (await getDoctorAnalytics()) || [];
  const appointments = (await getDoctorAppointments(doctorId)).data || [];

  const uniquePatientsMap = new Map();
  const status = doctorProfile?.status ?? "PENDING";
  appointments.forEach((app) => {
    if (!uniquePatientsMap.has(app.patientId)) {
      uniquePatientsMap.set(app.patientId, {
        patientId: app.patientId,
        name: `${app.firstName} ${app.lastName}`,
        email: app.email,
        phone: app.phone,
        location: app.location,
        gender: app.gender,
        occupation: app.occupation,
        dob: app.dob,
      });
    }
  });
  const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];
  return (
    <div className="px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
          Welcome, Dr. {user?.name}
        </h1>
        <div className="">
          <button
            className={cn(
              "py-2 px-3 rounded-md text-xs flex items-center space-x-2",
              status === "APPROVED"
                ? "bg-green-500 text-white"
                : status === "PENDING"
                ? "bg-orange-400"
                : "bg-red-500 text-white"
            )}
          >
            {status === "APPROVED" ? (
              <Check />
            ) : status === "PENDING" ? (
              <RefreshCcw />
            ) : (
              <X />
            )}

            {status}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {analytics.map((item, i) => {
          return <AnalyticsCard key={i} data={item} />;
        })}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 grid-cols-1 ">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Appointments</CardTitle>
              <Button asChild>
                <Link href="/dashboard/doctor/appointments">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {appointments &&
              appointments.slice(0, 5).map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/dashboard/doctor/appointments/view/${item.id}`}
                    className={
                      "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900"
                    }
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
                    <div className="flex items-center gap-4">
                      <div className="flex items-center font-semibold">
                        <CalendarCheck className="w-4 h-4 mr-2" />
                        <span>{item.appointmentFormattedDate}</span>
                      </div>
                      <span className="font-semibold">
                        {item.appointmentTime}
                      </span>
                      <div
                        className={cn(
                          "flex items-center text-blue-600",
                          item.status === "approved" &&
                            "text-green-600 font-semibold"
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
                    </div>
                  </Link>
                );
              })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Patients</CardTitle>
              <Button asChild>
                <Link href="/dashboard/doctor/patients">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8">
            {patients &&
              patients.slice(0, 5).map((patient) => {
                const initials = getInitials(patient.name);
                return (
                  <div key={patient.email} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src={""} alt="Avatar" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {patient.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {patient.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium flex space-x-2 items-center">
                      <Button size={"sm"} asChild variant={"outline"}>
                        <Link
                          href={`/dashboard/doctor/patients/view/${patient.patientId}`}
                        >
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
