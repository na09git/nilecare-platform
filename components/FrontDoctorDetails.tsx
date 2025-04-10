import React from "react";
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
import SubHeading from "./SubHeading";
import { DoctorProfile } from "@prisma/client";
import { FaRegFilePdf } from "react-icons/fa";
import Link from "next/link";
export default function FrontDoctorDetails({
  doctorProfile,
}: {
  doctorProfile: DoctorProfile | null | undefined;
}) {
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
  const dob = doctorProfile?.dob ?? "1992-05-13T21:00:00.000Z";
  return (
    <div className="p-4">
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Doctor Details</TabsTrigger>
          <TabsTrigger value="education">Education Info</TabsTrigger>
          <TabsTrigger value="practice">Practice Info</TabsTrigger>
          <TabsTrigger value="additional">Additional Info</TabsTrigger>
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
