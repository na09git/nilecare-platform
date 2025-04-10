import { getDoctorAppointments } from "@/actions/appointments";
import HomeDisplayCard from "@/components/Dashboard/Doctor/HomeDisplayCard";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { PatientProps } from "./layout";
import generateSlug from "@/utils/generateSlug";
import { getDoctors } from "@/actions/users";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "ADMIN") {
    return <NotAuthorized />;
  }
  const doctors = (await getDoctors()) || [];
  // console.log(patients);
  //doctors/doctor-asuman-jb
  return (
    <div>
      <div className="py-2  border-b border-gray-200 flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NewButton title="New Doctor" href={`#`} />
        </div>
      </div>
      <HomeDisplayCard
        title="Doctors"
        newAppointmentLink={`#`}
        count={doctors.length}
      />
    </div>
  );
}
