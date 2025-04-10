"use client";
import React from "react";
import { Tabs } from "flowbite-react";
import Monday from "./AvailabilityDays/Monday";
import { DoctorProfile } from "@prisma/client";
import Tuesday from "./AvailabilityDays/Tuesday";
import Wednesday from "./AvailabilityDays/Wednesday";
import Thursday from "./AvailabilityDays/Thursday";
import Friday from "./AvailabilityDays/Friday";
import Saturday from "./AvailabilityDays/Saturday";
import Sunday from "./AvailabilityDays/Sunday";
export default function AvailabilitySettings({
  profile,
}: {
  profile: DoctorProfile | undefined | null;
}) {
  const tabs = [
    {
      title: "Monday",
      component: <Monday profile={profile} day="monday" />,
    },
    {
      title: "Tuesday",
      component: <Tuesday day="tuesday" profile={profile} />,
    },
    {
      title: "Wednesday",
      component: <Wednesday profile={profile} day="wednesday" />,
    },
    {
      title: "Thursday",
      component: <Thursday profile={profile} day="thursday" />,
    },
    {
      title: "Friday",
      component: <Friday profile={profile} day="friday" />,
    },
    {
      title: "Saturday",
      component: <Saturday profile={profile} day="saturday" />,
    },
    {
      title: "Sunday",
      component: <Sunday profile={profile} day="sunday" />,
    },
  ];
  return (
    <div>
      <p className="py-3">Please Add the Availability for the Whole Week</p>
      <Tabs aria-label="Tabs with underline" style="underline">
        {tabs.map((tab, i) => {
          return (
            <Tabs.Item key={i} active title={tab.title}>
              {tab.component}
            </Tabs.Item>
          );
        })}
      </Tabs>
    </div>
  );
}
