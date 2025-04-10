import {
  DataProps,
  getDoctorsBySearch,
  getDoctorsByServiceSlug,
} from "@/actions/doctors";
import { getServices } from "@/actions/services";
import DoctorCard from "@/components/DoctorCard";
import LinkCards from "@/components/Frontend/Doctors/LinkCards";
import SymptomCards from "@/components/Frontend/Doctors/SymptomCards";
import ServiceList from "@/components/Frontend/Services/ServiceList";
import { Doctor } from "@/types/types";
import Link from "next/link";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { query } = searchParams;
  const data = await getDoctorsBySearch(query as string);
  const doctors = data?.doctors || [];
  const searchServices = data?.services || [];
  const specialties = data?.specialties || [];
  const symptoms = data?.symptoms || [];
  const allServices = (await getServices()).data || [];
  const services = searchServices.length > 0 ? searchServices : allServices;
  return (
    <div className="container p-8">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl pb-6 ">
        Search results for <span className="capitalize">{query}</span>
        {/* ({doctors.length.toString().padStart(2, "0")}) */}
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-3  border border-gray-200/50 rounded-sm p-6">
          <h2 className="capitalize font-semibold">Browse By Services</h2>
          {services && services.length > 0 && (
            <div className="py-3 flex flex-col text-sm space-y-2">
              {services.map((service, i) => {
                return (
                  <Link
                    key={i}
                    href={`/service/${service.slug}`}
                    className="hover:text-blue-600"
                  >
                    {service.title} &nbsp; (
                    {service._count.doctorProfiles.toString().padStart(2, "0")})
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="col-span-9 ">
          {searchServices && searchServices.length > 0 && (
            <div className="py-6 border-b">
              <h2 className="pb-3">
                Results for <span className="font-semibold">{query}</span> in
                services
              </h2>
              <ServiceList data={searchServices} />
            </div>
          )}
          {specialties && specialties.length > 0 && (
            <div className="py-6 border-b">
              <h2 className="pb-3">
                Results for <span className="font-semibold">{query}</span> in
                Specialties
              </h2>
              <LinkCards className="bg-blue-900" specialties={specialties} />
            </div>
          )}
          {symptoms && symptoms.length > 0 && (
            <div className="py-6 border-b">
              <h2 className="pb-3">
                Results for <span className="font-semibold">{query}</span> in
                Symptoms
              </h2>
              <SymptomCards className="bg-blue-900" symptoms={symptoms} />
            </div>
          )}
          {doctors && doctors.length > 0 && (
            <div className="py-6">
              <h2 className="pb-3">
                Results for <span className="font-semibold">{query}</span> in
                Doctors
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {doctors.map((doctor: Doctor) => {
                  return <DoctorCard key={doctor.id} doctor={doctor} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
