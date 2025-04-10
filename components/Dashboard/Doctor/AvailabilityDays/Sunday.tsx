import {
  createAvailability,
  updateAvailabilityById,
} from "@/actions/onboarding";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Button } from "@/components/ui/button";
import { DoctorProfile } from "@prisma/client";
import { Loader, Plus, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SelectedTimes from "./SelectedTimes";
import { timesArray } from "@/config/constants";

export default function Sunday({
  profile,
  day,
}: {
  profile: any;
  day: string;
}) {
  const availability = profile?.availability || "";
  let initialData: string[] = ["7:00 AM"];
  if (profile && profile?.availability) {
    initialData = profile?.availability[day] || [];
  }
  const [selectedTimes, setSelectedTimes] = useState(initialData);
  // console.log(selectedTimes);
  function handleAddTime(time: string) {
    if (!selectedTimes.includes(time)) {
      setSelectedTimes((prevTimes) => [...prevTimes, time]);
    } else {
      toast.error(`${time} already added!`);
    }
  }
  function handleAddAll() {
    setSelectedTimes([...timesArray]);
  }
  function clearAll() {
    setSelectedTimes([]);
  }
  async function handleSubmit() {
    setLoading(true);
    try {
      if (profile?.id && availability?.id) {
        const data = {
          sunday: selectedTimes,
          doctorProfileId: profile.id,
        };
        await updateAvailabilityById(availability?.id, data);
        toast.success("Settings Updated Successfully");
        setLoading(false);
        // console.log(data);
      } else if (profile?.id) {
        // console.log("id not set");
        const data = {
          sunday: selectedTimes,
          doctorProfileId: profile.id,
        };
        await createAvailability(data);
        toast.success("Settings Updated Successfully");
        setLoading(false);
      } else {
        // console.log("Profile id Not set");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  function handleRemoveTime(index: number) {
    const updatedTimes = selectedTimes.filter((_, i) => i !== index);
    setSelectedTimes(updatedTimes);
  }
  const [loading, setLoading] = useState(false);
  return (
    <SelectedTimes
      handleAddAll={handleAddAll}
      timesArray={timesArray}
      handleAddTime={handleAddTime}
      selectedTimes={selectedTimes}
      loading={loading}
      handleSubmit={handleSubmit}
      clearAll={clearAll}
      handleRemoveTime={handleRemoveTime}
      day={day}
    />
  );
}
