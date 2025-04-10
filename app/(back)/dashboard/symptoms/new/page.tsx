import ServiceForm from "@/components/Dashboard/ServiceForm";
import SpecialtyForm from "@/components/Dashboard/SpecialtyForm";
import SymptomForm from "@/components/Dashboard/SymptomForm";
import React from "react";

export default function page() {
  return (
    <div>
      <SymptomForm title="New Symptom" />
    </div>
  );
}
