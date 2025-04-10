import {
  getDoctorAppointments,
  getPatientAppointments,
} from "@/actions/appointments";
import { getDoctorById, getDoctorProfile } from "@/actions/users";
import { FaRegFilePdf } from "react-icons/fa";
import ApproveBtn from "@/components/Dashboard/ApproveBtn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { getNormalDate } from "@/utils/getNormalDate";
import { timeAgo } from "@/utils/timeAgo";
import {
  AlertTriangle,
  Calendar,
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SubHeading from "@/components/SubHeading";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const appointments = (await getDoctorAppointments(id)).data || [];
  const doctor = await getDoctorById(id);
  const doctorProfile = await getDoctorProfile(id);
  const status = doctorProfile?.status ?? "PENDING";
  const dob = doctorProfile?.dob ?? "1992-05-13T21:00:00.000Z";
  const expiry =
    doctorProfile?.medicalLicenseExpiry ?? "1992-05-13T21:00:00.000Z";
  // console.log(dob);
  if (!doctorProfile) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="space-y-3 text-center flex items-center justify-center flex-col">
          <AlertTriangle className="w-10 h-10 " />
          <h2>No Doctor Profile Found</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            {doctor?.name}
          </h2>
          <h2 className="border-b pb-3 mb-3">
            {doctor?.email} | {doctor?.phone}
          </h2>
        </div>
        <div className="">
          <ApproveBtn status={status} profileId={doctorProfile?.id ?? ""} />
          <h2 className="border-b pb-3 mb-3">
            Appointments ({appointments.length.toString().padStart(2, "0")})
          </h2>
        </div>
      </div>
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Doctor Details</TabsTrigger>
          <TabsTrigger value="education">Education Info</TabsTrigger>
          <TabsTrigger value="practice">Practice Info</TabsTrigger>
          <TabsTrigger value="additional">Additional Info</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="p-4">
            <SubHeading title="Bio Data" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">First Name :</span>
                <span>{doctorProfile?.firstName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Last Name :</span>
                <span>{doctorProfile?.lastName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Date of Birth :</span>
                <span>{getNormalDate(dob as string)}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Middle Name :</span>
                <span>{doctorProfile?.middleName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Gender :</span>
                <span>{doctorProfile?.gender}</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <SubHeading title="Profile Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Medical License :</span>
                <span>{doctorProfile?.medicalLicense}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Years of Experience :</span>
                <span>{doctorProfile?.yearsOfExperience}</span>
              </div>
            </div>
            <div className="py-3 space-y-3">
              <div className="flex items-center">
                <span className="mr-3">Medical License Expiry :</span>
                <span>{getNormalDate(expiry as string)}</span>
              </div>
              <p>{doctorProfile?.bio}</p>
            </div>
          </div>
          <div className="p-4">
            <SubHeading title="Contact Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Email Address :</span>
                <span>{doctorProfile?.email}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Phone :</span>
                <span>{doctorProfile?.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Country :</span>
                <span>{doctorProfile?.country}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">City:</span>
                <span>{doctorProfile?.city}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">State :</span>
                <span>{doctorProfile?.state}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="education">
          <div className="p-4">
            <SubHeading title="Education Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Graduation Year :</span>
                <span>{doctorProfile?.graduationYear}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Primary Specialization :</span>
                <span>{doctorProfile?.primarySpecialization}</span>
              </div>
            </div>
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Medical School :</span>
                <span>{doctorProfile?.medicalSchool}</span>
              </div>
              {doctorProfile?.otherSpecialties && (
                <div className="">
                  <h2>Other Specialties</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {doctorProfile.otherSpecialties.map((item, i) => {
                      return (
                        <p key={i} className="py-1.5 px-4 border rounded-md">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
              {doctorProfile?.boardCertificates && (
                <div className="">
                  <h2>Academic Documents</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {doctorProfile.boardCertificates.map((item, i) => {
                      return (
                        <Link
                          key={i}
                          href={item}
                          target="_blank"
                          className="py-1.5 px-4 border rounded-md flex items-center"
                        >
                          <FaRegFilePdf className="w-4 h-4 mr-2" /> {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="practice">
          <div className="p-4">
            <SubHeading title="Practice Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Hospital Name :</span>
                <span>{doctorProfile?.hospitalName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Hourly Charge :</span>
                <span>{doctorProfile?.hourlyWage}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Hospital Address :</span>
                <span>{doctorProfile?.hospitalAddress}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Hospital Contact :</span>
                <span>{doctorProfile?.hospitalContactNumber}</span>
              </div>

              <div className="flex items-center">
                <span className="mr-3">Hospital Hours of operation :</span>
                <span>{doctorProfile?.hospitalHoursOfOperation}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Do you accept Insurance :</span>
                <span>{doctorProfile?.insuranceAccepted}</span>
              </div>
            </div>
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Hospital Email address :</span>
                <span>{doctorProfile?.hospitalEmailAddress}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Hospital Website address :</span>
                <span>{doctorProfile?.hospitalWebsite}</span>
              </div>

              {doctorProfile?.servicesOffered && (
                <div className="">
                  <h2>Hospital Services</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {doctorProfile.servicesOffered.map((item, i) => {
                      return (
                        <p key={i} className="py-1.5 px-4 border rounded-md">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="additional">
          <div className="p-4">
            <SubHeading title="Additional Information" />

            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Education History :</span>
                <span>{doctorProfile?.educationHistory}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Published Works or Research :</span>
                <span>{doctorProfile?.research}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Accomplishments or awards :</span>
                <span>{doctorProfile?.accomplishments}</span>
              </div>
              {doctorProfile?.additionalDocs && (
                <div className="">
                  <h2>Additional Documents</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {doctorProfile.additionalDocs.map((item, i) => {
                      return (
                        <Link
                          key={i}
                          href={item}
                          target="_blank"
                          className="py-1.5 px-4 border rounded-md flex items-center"
                        >
                          <FaRegFilePdf className="w-4 h-4 mr-2" /> {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
