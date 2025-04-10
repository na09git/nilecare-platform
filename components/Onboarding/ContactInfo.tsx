"use client";
import { BioDataFormProps, ContactFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

import RadioInput from "../FormInputs/RadioInput";

import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export default function ContactInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  doctorProfile,
}: StepFormProps) {
  const { contactData, savedDBData, setContactData } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  // console.log(date);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormProps>({
    defaultValues: {
      email: doctorProfile.email || savedDBData.email,
      phone: doctorProfile.phone || savedDBData.phone,
      country: doctorProfile.country || savedDBData.country,
      city: doctorProfile.city || savedDBData.city,
      state: doctorProfile.state || savedDBData.state,
      page: doctorProfile.page || savedDBData.page,
    },
  });
  const router = useRouter();
  async function onSubmit(data: ContactFormProps) {
    setIsLoading(true);
    data.page = page;
    console.log(data);
    // setIsLoading(true);

    //   email: string;
    // phone: string;
    // country: string;
    // city: string;
    // state: string;
    // page: string;
    try {
      const res = await updateDoctorProfile(doctorProfile.id, data);
      setContactData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Contact Info Updated Successfully");
        //extract the profile form data from the updated profile
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
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
            label="Email Address"
            register={register}
            name="email"
            errors={errors}
            placeholder="eg umar@gmail.com "
          />
          <TextInput
            label="Phone"
            register={register}
            name="phone"
            errors={errors}
            placeholder="eg 0762063160 "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Country"
            register={register}
            name="country"
            errors={errors}
            placeholder="Enter your Country"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="City"
            register={register}
            name="city"
            errors={errors}
            placeholder="Enter your City"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="State"
            register={register}
            name="state"
            errors={errors}
            placeholder="Enter your State"
            className="col-span-full sm:col-span-1"
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
