"use client";

import {
  ServiceWithDoctorProfileCount,
  updateDoctorProfileWithService,
} from "@/actions/services";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DoctorProfile, Service, Speciality, Symptom } from "@prisma/client";
import { Loader, Map, Video } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateServiceForm({
  services,
  specialties,
  symptoms,
  profile,
}: {
  services: ServiceWithDoctorProfileCount[] | null;
  specialties: Speciality[] | null;
  symptoms: Symptom[] | null;
  profile: DoctorProfile | undefined | null;
}) {
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return (
  //     <div className="flex items-center ">
  //       <Loader className="mr-1 w-4 h-4 animate-spin" />
  //       <span>Loading a User...</span>
  //     </div>
  //   );
  // }
  const profileId = profile?.id;
  // const user = session?.user;
  const initialServiceId = profile?.serviceId ?? "";
  const initialSpecialtyId = profile?.specialtyId ?? "";
  const initialOperationMode = profile?.operationMode ?? "";
  const initialSymptomIds = profile?.symptomIds || [];
  const initialPrice = profile?.hourlyWage ?? 100;
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [specialtyId, setSpecialtyId] = useState(initialSpecialtyId);
  const [operationMode, setOperationMode] = useState(initialOperationMode);
  const [symptomIds, setSymptomIds] = useState<string[]>(initialSymptomIds);
  const [savingServices, setSavingServices] = useState(false);
  const [savingPrice, setSavingPrice] = useState(false);
  const [price, setPrice] = useState(initialPrice);
  const [savingSpecialty, setSavingSpecialty] = useState(false);
  const [savingSymptoms, setSavingSymptoms] = useState(false);
  const [savingMode, setSavingMode] = useState(false);
  // console.log(price);
  const operationModes = [
    {
      title: "Telehealth visit",
      slug: "telehealth-visit",
      icon: Video,
    },
    {
      title: "In-person doctor visit",
      slug: "inperson-doctor-visit",
      icon: Map,
    },
  ];
  async function handleUpdateService() {
    setSavingServices(true);
    const data = {
      serviceId: selectedServiceId,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Service Updated Successfully");
      setSavingServices(false);
    } catch (error) {
      console.log(error);
      setSavingServices(false);
    }
    console.log(data);
  }
  async function handleUpdatePrice() {
    setSavingPrice(true);
    const data = {
      hourlyWage: price,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Price Updated Successfully");
      setSavingPrice(false);
    } catch (error) {
      console.log(error);
      setSavingPrice(false);
    }
    console.log(data);
  }
  async function handleUpdateSpecialty() {
    setSavingSpecialty(true);
    const data = {
      specialtyId,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Specialty Updated Successfully");
      setSavingSpecialty(false);
    } catch (error) {
      console.log(error);
      setSavingSpecialty(false);
    }
    console.log(data);
  }
  async function handleUpdateSymptoms() {
    setSavingSymptoms(true);
    const data = {
      symptomIds,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Symptoms Updated Successfully");
      setSavingSymptoms(false);
    } catch (error) {
      console.log(error);
      setSavingSymptoms(false);
    }
    console.log(data);
  }
  async function handleUpdateMode() {
    setSavingMode(true);
    const data = {
      operationMode,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Operation Mode Updated Successfully");
      setSavingMode(false);
    } catch (error) {
      console.log(error);
      setSavingMode(false);
    }
    console.log(data);
  }
  return (
    <>
      <CardContent className="space-y-3">
        <div className=" border shadow rounded-md p-4 mt-4">
          <div className="sm:col-span-4">
            <div className="flex items-center justify-between border-b">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                Update Hour Price
              </h2>
              <Button disabled={savingPrice} onClick={handleUpdatePrice}>
                {savingPrice ? "Saving please wait..." : "Update Price"}
              </Button>
            </div>
            <div className=" mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                  autoComplete="price"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border shadow rounded-md p-4 mt-4">
          <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
              Choose your Operation Mode
            </h2>
            <Button disabled={savingMode} onClick={handleUpdateMode}>
              {savingMode ? "Saving please wait..." : "Update Operation Mode"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3">
            {operationModes &&
              operationModes.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setOperationMode(item.title)}
                    className={cn(
                      "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                      operationMode === item.title
                        ? "border-2 border-purple-600 bg-slate-50"
                        : ""
                    )}
                  >
                    <Icon className="w-8 h-8 " />
                    <p className="text-xs">{item.title}</p>
                  </button>
                );
              })}
          </div>
        </div>
        <div className="border shadow rounded-md p-4 mt-4">
          <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
              Choose your Service you want to offer
            </h2>
            <Button disabled={savingServices} onClick={handleUpdateService}>
              {savingServices ? "Saving please wait..." : "Update Service"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3">
            {services &&
              services.map((item, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedServiceId(item.id)}
                    className={cn(
                      "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                      selectedServiceId === item.id
                        ? "border-2 border-purple-600 bg-slate-50"
                        : ""
                    )}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="w-14 h-14"
                    />
                    <p className="text-xs">{item.title}</p>
                  </button>
                );
              })}
          </div>
        </div>

        <div className="border shadow rounded-md p-4">
          <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
              Select your Specialty
            </h2>
            <Button disabled={savingSpecialty} onClick={handleUpdateSpecialty}>
              {savingSpecialty ? "Saving please wait..." : "Update Specialty"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3">
            {specialties &&
              specialties.map((item, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setSpecialtyId(item.id)}
                    className={cn(
                      "border flex items-center justify-center flex-col py-3 px-3 rounded-md cursor-pointer",
                      specialtyId === item.id
                        ? "border-2 border-purple-600 bg-slate-50"
                        : ""
                    )}
                  >
                    <p className="text-xs">{item.title}</p>
                  </button>
                );
              })}
          </div>
        </div>
        <div className="border shadow rounded-md p-4">
          <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
              Select the Symptoms
            </h2>
            <Button disabled={savingSymptoms} onClick={handleUpdateSymptoms}>
              {savingSymptoms ? "Saving please wait..." : "Update Symptoms"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3">
            {symptoms &&
              symptoms.map((item, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setSymptomIds([...symptomIds, item.id])}
                    className={cn(
                      "border flex items-center justify-center flex-col py-3 px-3 rounded-md cursor-pointer",
                      symptomIds.includes(item.id)
                        ? "border-2 border-purple-600 bg-slate-50"
                        : ""
                    )}
                  >
                    <p className="text-xs">{item.title}</p>
                  </button>
                );
              })}
          </div>
        </div>
      </CardContent>
    </>
  );
}
