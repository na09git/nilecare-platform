import { Doctor, DoctorProfileAvailability } from "@/types/types";
import generateSlug from "@/utils/generateSlug";
import { getDayName } from "@/utils/getDayName";
import { getFormattedDate } from "@/utils/getFormatedShortDate";
import { DoctorProfile, User } from "@prisma/client";
import { Stethoscope, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getDoctorProfile } from "@/actions/users";



// interface DoctorProps extends DoctorProfile{


// }
export default async function DoctorCard({
  isInPerson = false,
  doctor,
}: {
  isInPerson?: boolean;
  doctor: any;
}) {
  const today: keyof DoctorProfileAvailability = getDayName();
  const times = doctor.doctorProfile?.availability?.[today] ?? null;
  const formattedDate = getFormattedDate();

  // console.log(times);

  return (
    <>
      {times && times.length > 0 && (
        <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-800 inline-flex flex-col py-8 px-6 rounded-md hover:border-gray-400 duration-300 transition-all">
          <Link href={`/doctors/${doctor.slug}?id=${doctor.id}`}>
            <h2 className="uppercase font-bold text-2xl tracking-widest">
              {`${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`}
            </h2>
            {isInPerson && (
              <p className="py-3">
                Ethiopia
              </p>
            )}
            <div className="flex items-center gap-4 py-4">
              <div className="relative">
                <Image
                  src={
                    doctor.doctorProfile?.profilePicture ?? "https://i3xnck6xv3.ufs.sh/f/6yE5Wak1AykcFDJpROyHNeSrW97Da3Zlqop1dyzJC8O0ViRT"
                  }
                  width={243}
                  height={207}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                {!isInPerson && (
                  <p className="absolute bottom-0 right-2 bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full text-blue-700">
                    <Video className="w-6 h-6" />
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0" />

                  {!isInPerson && (
                    <span>Tele Medicine</span>
                  )}
                  {isInPerson && (
                    <span>Inperson Service</span>
                  )}
                  {/* {doctor.doctorProfile?.otherSpecialties} */}

                </p>
                <p className="bg-green-200 dark:text-slate-900 py-3 px-6 uppercase ">
                  Available today
                </p>
              </div>
            </div>
          </Link>
          <div className="pt-6 border-t border-gray-400 dark:border-gray-600">
            <h3 className="flex gap-4 justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                {formattedDate}
              </span>{" "}
              <span className="font-bold">
                {doctor.doctorProfile?.hourlyWage} ~ Birr
              </span>
            </h3>
            <div className="py-3 grid grid-cols-3 gap-2">
              {times.slice(0, 5).map((item: string[], i: number) => {
                return (
                  <Link
                    className="bg-blue-600 text-sm text-white p-2  text-center"
                    key={i}
                    href={`/doctors/${doctor.slug}?id=${doctor.id}`}
                  >
                    {item}
                  </Link>
                );
              })}
              <Link
                className="text-[0.7rem] text-center bg-blue-900 text-white py-2 px-3 truncate"
                href={`/doctors/${doctor.slug}?id=${doctor.id}`}
              >
                More times
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
