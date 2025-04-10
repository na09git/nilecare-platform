"use client";

import { Tabs } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe, X } from "lucide-react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { Service, Speciality, Symptom } from "@prisma/client";
import SymptomCards from "./Doctors/SymptomCards";
import { ServiceWithDoctorProfileCount } from "@/actions/services";
// import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";
type TabbedItemsProps = {
  services: ServiceWithDoctorProfileCount[];
  specialties: Speciality[];
  symptoms: Symptom[];
};
export default function TabbedItems({
  services,
  specialties,
  symptoms,
}: TabbedItemsProps) {
  const tabs = [
    {
      title: "Popular Services",
      icon: Stethoscope,
      component: <ServiceList data={services} />,
      content: [],
    },
    // {
    //   title: "Doctors",
    //   icon: Microscope,
    //   component: <LinkCards />,
    //   content: [],
    // },
    {
      title: "Specialists",
      icon: Activity,
      component: (
        <LinkCards className="bg-blue-900" specialties={specialties} />
      ),
      content: [],
    },
    {
      title: "Symptoms",
      icon: Syringe,
      component: <SymptomCards symptoms={symptoms} className="bg-pink-950" />,
      content: [],
    },
  ];
  return (
    <Tabs aria-label="Tabs with underline" style="underline">
      {tabs.map((tab, i) => {
        return (
          <Tabs.Item key={i} active title={tab.title} icon={tab.icon}>
            {tab.component}
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
}
