import { getDoctorProfileById } from "@/actions/onboarding";
import { getSpecialties } from "@/actions/specialities";
import OnboardingSteps from "@/components/Onboarding/OnboardingSteps";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  //Get existing doctor profile
  const specialties = (await getSpecialties()).data || [];
  const doctorProfile = (await getDoctorProfileById(id))?.data;
  // console.log(doctorProfile);
  return (
    <div className="bg-teal-700 dark:bg-slate-800">
      {doctorProfile && doctorProfile.id && (
        <div className="max-w-5xl mx-auto py-8 min-h-screen">
          <OnboardingSteps
            doctorProfile={doctorProfile}
            id={id}
            specialties={specialties}
          />
        </div>
      )}
    </div>
  );
}
