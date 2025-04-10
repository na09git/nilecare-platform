import { getServices } from "@/actions/services";
import { getSpecialties } from "@/actions/specialities";
import { getSymptoms } from "@/actions/symptom";
import HomeDisplayCard from "@/components/Dashboard/Doctor/HomeDisplayCard";
import ListPanel from "@/components/Dashboard/Doctor/ListPanel";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import ServiceCard from "@/components/Dashboard/ServiceCard";
import ServiceForm from "@/components/Dashboard/ServiceForm";
import SpecialtyCard from "@/components/Dashboard/SpecialtyCard";
import SymptomCard from "@/components/Dashboard/SymptomCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Anvil, Calendar, LayoutGrid } from "lucide-react";
import React from "react";

export default async function page() {
  const symptoms = (await getSymptoms()).data || [];
  return (
    <div>
      {/* Header */}

      {/* 2 PANNELS */}
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="lg:col-span-4 col-span-full  py-3 border-r border-gray-100">
          <div className="flex items-center justify-between">
            <PanelHeader
              title="Symptoms"
              count={symptoms.length}
              icon={Activity}
            />
            <div className="lg:hidden">
              <NewButton title="New Symptom" href="/dashboard/symptoms/new" />
            </div>
          </div>
          <div className="px-3">
            <ScrollArea className="h-96 w-full ">
              {symptoms.map((symptom) => (
                <SymptomCard key={symptom.title} symptom={symptom} />
              ))}
            </ScrollArea>
          </div>
        </div>

        <div className="lg:col-span-8 col-span-full hidden lg:block">
          <div className="py-2  border-b border-gray-200 flex items-center justify-end px-4">
            <div className="flex items-center gap-4">
              <NewButton title="New Symptom" href="/dashboard/symptoms/new" />
            </div>
          </div>
          <div className="flex h-1/2 items-center justify-center">
            <div className="py-4  px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
              <Activity />
              <div className="py-3">
                {" "}
                <p>
                  You have {symptoms.length.toString().padStart(2, "0")}{" "}
                  specialties today.
                </p>
              </div>
              <NewButton title="New Symptom" href="/dashboard/symptoms/new" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
