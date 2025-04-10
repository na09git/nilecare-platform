import { getSpecialtyBySlug } from "@/actions/specialities";
import { getSymptomBySlug } from "@/actions/symptom";

import SpecialtyForm from "@/components/Dashboard/SpecialtyForm";
import SymptomForm from "@/components/Dashboard/SymptomForm";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const symptom = (await getSymptomBySlug(slug))?.data;
  return (
    <div>
      {symptom && symptom.id && (
        <SymptomForm title="Update Symptom" initialData={symptom} />
      )}
    </div>
  );
}
