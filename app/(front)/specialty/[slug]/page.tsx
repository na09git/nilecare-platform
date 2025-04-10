import {
  DataProps,
  getDoctorsByServiceSlug,
  getDoctorsBySpecialtySlug,
} from "@/actions/doctors";
import DoctorCard from "@/components/DoctorCard";
import { Doctor } from "@/types/types";
import Link from "next/link";
import React from "react";

export default async function page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { type } = searchParams;
  console.log(type);
  const title = slug.split("-").join(" ");
  const data = (await getDoctorsBySpecialtySlug(slug)) as DataProps;
  const doctors = (data?.doctors as Doctor[]) || [];
  console.log(doctors);
  const services = data?.services || [];
  return (
    <div className="container p-4 md:p-8">
      <h1 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight pb-6 capitalize">

        {title}({doctors.length.toString().padStart(2, "0") || "0"})
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-12 md:col-span-3 border border-gray-200/50 rounded-sm p-6">

          <h2 className="capitalize font-semibold">Other Services</h2>
          {services && services.length > 0 && (
            <div className="py-3 flex flex-col text-sm space-y-2">
              {services.map((service, i) => {
                return (
                  <Link
                    key={i}
                    href={`/specialty/${service.slug}`}
                    className="block p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                    {service.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-9">
          {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {doctors.map((doctor: Doctor) => {
                return <DoctorCard key={doctor.id} doctor={doctor} />;
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
             <h2 className="text-xl font-semibold">No 👨‍⚕️ Doctors Available for this Category</h2>
             <p className="text-sm">Check back later or explore other services.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
