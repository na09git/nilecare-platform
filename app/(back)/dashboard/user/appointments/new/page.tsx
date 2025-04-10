import { getDoctors } from "@/actions/users";
import DoctorCard from "@/components/DoctorCard";
import DoctorsList from "@/components/DoctorsList";
import React from "react";

export default async function NewAppointment() {
  const doctors = (await getDoctors()) || [];
  // console.log(doctors);
  const telhealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth visit"
  );
  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person doctor visit"
  );
  console.log(telhealthDoctors);
  return (
    <section className="">
      {/* <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">
        Select the Doctor to Continue
      </h2> */}
      {telhealthDoctors && telhealthDoctors.length > 0 && (
        <div className="py-4 ">
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">
            Telehealth Doctors
          </h2>
          <div className="grid place-items-center">
            {telhealthDoctors.map((doctor) => {
              return (
                <DoctorCard key={doctor.id} isInPerson={true} doctor={doctor} />
              );
            })}
          </div>
        </div>
      )}

      {inpersonDoctors && inpersonDoctors.length > 0 && (
        <div className="py-4 ">
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">
            Inperson Doctors
          </h2>
          <div className="grid place-items-center">
            {inpersonDoctors.map((doctor) => {
              return (
                <DoctorCard key={doctor.id} isInPerson={true} doctor={doctor} />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
