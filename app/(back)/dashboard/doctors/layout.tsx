import {
  getAppointments,
  getDoctorAppointments,
  getPatientAppointments,
} from "@/actions/appointments";
import { getDoctors } from "@/actions/users";
import DoctorPanel from "@/components/Dashboard/Doctor/DoctorPanel";
import DoctorsPanel from "@/components/Dashboard/Doctor/DoctorsPanel";
import ListPanel from "@/components/Dashboard/Doctor/ListPanel";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import PatientPanel from "@/components/Dashboard/Doctor/PatientPanel";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Calendar, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}
export interface DoctorProps {
  doctorId: string;
  doctorName: string;
}
export default async function PatientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "ADMIN") {
    return <NotAuthorized />;
  }
  const doctors = (await getDoctors()) || [];
  return (
    <div>
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="col-span-4  py-3 border-r border-gray-100">
          <PanelHeader
            title="Doctors"
            count={doctors.length ?? 0}
            icon={Users}
          />
          <div className="px-3">
            <DoctorPanel doctors={doctors} role={user?.role} />
          </div>
        </div>

        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
}
