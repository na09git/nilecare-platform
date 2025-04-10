"use client";
import { BioDataFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";

import RadioInput from "../FormInputs/RadioInput";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { createDoctorProfile, updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";
import { DoctorProfile, Speciality } from "@prisma/client";

export type StepFormProps = {
  page: string;
  title: string;
  description: string;
  userId?: string;
  nextPage?: string;
  formId?: string;
  specialties?: Speciality[];
  doctorProfile: DoctorProfile;
};
export default function BioDataForm({
  page,
  title,
  description,
  userId,
  nextPage,
  formId = "",
  doctorProfile,
}: StepFormProps) {
  //GET CONTEXT DATA
  const pathname = usePathname();
  const {
    truckingNumber,
    setTruckingNumber,
    doctorProfileId,
    setDoctorProfileId,
  } = useOnboardingContext();
  console.log(truckingNumber, doctorProfileId);
  const [isLoading, setIsLoading] = useState(false);
  const { bioData, savedDBData, setBioData } = useOnboardingContext();
  const initialDOB = doctorProfile.dob || savedDBData.dob;
  const [dob, setDOB] = useState<Date>(initialDOB);
  const defaultData = bioData || savedDBData;
  console.log(savedDBData);

  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];
  // console.log(date);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BioDataFormProps>({
    defaultValues: {
      firstName: doctorProfile.firstName || savedDBData.firstName,
      lastName: doctorProfile.lastName || savedDBData.lastName,
      middleName: doctorProfile.middleName || savedDBData.middleName,
      dob: doctorProfile.dob || savedDBData.dob,
      gender: doctorProfile.gender || savedDBData.gender,
      page: doctorProfile.page || savedDBData.page,
      trackingNumber:
        doctorProfile.trackingNumber || savedDBData.trackingNumber,
    },
  });
  const router = useRouter();
  async function onSubmit(data: BioDataFormProps) {
    setIsLoading(true);
    if (!dob) {
      toast.error("Please select your date of birth");
      setIsLoading(false);
      return;
    }
    data.userId = userId as string;
    data.dob = dob;

    // data.
    data.page = page;
    console.log(data);
    try {
      //save data to db
      if (formId) {
        const res = await updateDoctorProfile(doctorProfile.id, data);
        if (res && res.status === 201) {
          setIsLoading(false);
          toast.success("Bio Data updated successfully");
          setTruckingNumber(res.data?.trackingNumber ?? "");
          setDoctorProfileId(res.data?.id ?? "");

          //ROUTE TO the NEXT FORM
          router.push(`/onboarding/${userId}?page=${nextPage}`);
          console.log(res.data);
        } else {
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="First Name"
            register={register}
            name="firstName"
            errors={errors}
            placeholder="eg John "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Last Name"
            register={register}
            name="lastName"
            errors={errors}
            placeholder="eg Doe "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Middle Name (Optional)"
            register={register}
            name="middleName"
            errors={errors}
            isRequired={false}
            placeholder="Umar "
            className="col-span-full sm:col-span-1"
          />
          <DatePickerInput
            className="col-span-full sm:col-span-1"
            date={dob}
            setDate={setDOB}
            title="Date of Birth"
          />

          <RadioInput
            radioOptions={genderOptions}
            errors={errors}
            title="Gender"
            name="gender"
            register={register}
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Save and Continue"
            isLoading={isLoading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}
