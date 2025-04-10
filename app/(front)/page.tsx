import { getDoctors } from "@/actions/users";
import DoctorsList from "@/components/DoctorsList";
import Brands from "@/components/Frontend/Brands";
import Doctors from "@/components/Frontend/Doctors";
import Hero from "@/components/Frontend/Hero";
import MegaMenu from "@/components/Frontend/MegaMenu";
import TabbedSection from "@/components/Frontend/TabbedSection";
import Team from "@/components/Frontend/Team";
import React from "react";

export default async function Home() {
  const doctors = (await getDoctors()) || [];
  // console.log(doctors);
  const telhealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth visit"
  );
  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person doctor visit"
  );
  console.log(inpersonDoctors);
  return (
    <section className="">
      <Hero />
      {/* <Brands /> */}
      <TabbedSection />
      <DoctorsList doctors={telhealthDoctors} title="Telehealth visit" />
      <DoctorsList
        className="bg-blue-50 dark:bg-slate-900 py-8 lg:py-24"
        title="In-person doctor visit"
        isInPerson={true}
        doctors={inpersonDoctors}
      />
      <Doctors />
      <Team />
    </section>
  );
}
