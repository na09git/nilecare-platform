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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubHeading from "@/components/SubHeading";
import { getNormalDate } from "@/utils/getNormalDate";
import { Button } from "@/components/ui/button";
import generateSlug from "@/utils/generateSlug";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const appointments = (await getPatientAppointments(id)).data || [];
  const patientDetails = appointments[0];
  const dob = patientDetails?.dob ?? "1992-05-13T21:00:00.000Z";
  const patientDoctors = appointments.map((app) => {
    return {
      doctorName: app.doctorName,
      doctorId: app.doctorId,
    };
  });
  return (
    <div className="p-4">
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Patient Info</TabsTrigger>
          <TabsTrigger value="appointments">
            Appointments({appointments.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="p-4">
            <SubHeading title="Patient Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">First Name :</span>
                <span>{patientDetails.firstName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Last Name :</span>
                <span>{patientDetails.lastName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Phone Number :</span>
                <span>{patientDetails.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Email :</span>
                <span>{patientDetails.email}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Gender :</span>
                <span>{patientDetails.gender}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Location :</span>
                <span>{patientDetails.location}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Occupation :</span>
                <span>{patientDetails.occupation}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">DOB :</span>
                <span>{getNormalDate(dob as string)}</span>
              </div>
            </div>
            <div className="py-4 space-y-3">
              <div className="flex flex-col">
                <SubHeading title="Patient Doctors" />
                <div className="flex gap-4 flex-wrap">
                  {patientDoctors.map((doc) => {
                    const slug = generateSlug(doc.doctorName ?? "");
                    return (
                      <Button key={slug} variant={"outline"}>
                        <Link href={`/doctors/${slug}?id=${doc.doctorId}`}>
                          {doc.doctorName}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="appointments">
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
                      <span className="font-semibold">
                        {item.appointmentTime}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "flex items-center pt-2 text-blue-600",
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
                  </Link>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
