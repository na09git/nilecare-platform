"use client";
import { ProfileFormProps } from "@/types/types";

import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import toast from "react-hot-toast";

import { usePathname, useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import RadioInput from "../FormInputs/RadioInput";
import ImageInput from "../FormInputs/ImageInput";
import { StepFormProps } from "./BioDataForm";
import { useOnboardingContext } from "@/context/context";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function ProfileInfoForm({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  doctorProfile,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const { profileData, savedDBData, setProfileData } = useOnboardingContext();
  const initialExpiryDate =
    doctorProfile.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry;
  const initialProfileImage =
    doctorProfile.profilePicture || savedDBData.profilePicture;
  const [expiry, setExpiry] = useState<Date>(initialExpiryDate);
  const [profileImage, setProfileImage] = useState(initialProfileImage);

  // console.log(savedDBData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      bio: doctorProfile.bio || savedDBData.bio,
      page: doctorProfile.page || savedDBData.page,
      medicalLicense:
        doctorProfile.medicalLicense || savedDBData.medicalLicense,
      medicalLicenseExpiry:
        doctorProfile.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry,
      yearsOfExperience:
        doctorProfile.yearsOfExperience || savedDBData.yearsOfExperience,
    },
  });
  const router = useRouter();
  async function onSubmit(data: ProfileFormProps) {
    setIsLoading(true);
    if (!expiry) {
      toast.error("Please select your License Expiry Date");
      setIsLoading(false);
      return;
    }
    data.medicalLicenseExpiry = expiry;
    data.page = page;
    data.yearsOfExperience = Number(data.yearsOfExperience);
    data.profilePicture = profileImage;
    console.log(data);
    try {
      const res = await updateDoctorProfile(doctorProfile.id, data);
      setProfileData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        //extract the profile form data from the updated profile
        toast.success("Profile Info Updated Successfully");
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
    }
    //profilePicture?: string;
    // bio: string;
    // page: string;
    // medicalLicense: string;
    // medicalLicenseExpiry?: Date;
    // yearsOfExperience: number;
    //setIsLoading(true);
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
            label="Medical License"
            register={register}
            name="medicalLicense"
            errors={errors}
            placeholder="Enter Medical License"
          />
          <TextInput
            label="Years of Experience"
            register={register}
            name="yearsOfExperience"
            type="number"
            errors={errors}
            placeholder="Enter Years of Experience"
            className="col-span-full sm:col-span-1"
          />
          <DatePickerInput
            className="col-span-full sm:col-span-1"
            date={expiry}
            setDate={setExpiry}
            title="Medical License Expiry"
          />
          <TextAreaInput
            label="Enter your Biography"
            register={register}
            name="bio"
            errors={errors}
            placeholder="Enter your Biography"
          />
          <ImageInput
            label="Professional Profile Image"
            imageUrl={profileImage}
            setImageUrl={setProfileImage}
            endpoint="doctorProfileImage"
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
