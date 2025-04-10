"use client";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import ImageInput from "../FormInputs/ImageInput";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import { createManyServices, createService } from "@/actions/services";
import {
  createManySpecialties,
  createSpecialty,
  updateSpecialty,
} from "@/actions/specialities";
import { Speciality } from "@prisma/client";

export type SpecialtyProps = {
  title: string;
  slug: string;
};

export default function SpecialtyForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Speciality;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const editingId = initialData?.id || "";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpecialtyProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });
  const router = useRouter();
  async function onSubmit(data: SpecialtyProps) {
    setIsLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    console.log(data);
    if (editingId) {
      await updateSpecialty(editingId, data);
      toast.success("Specialty Updated Successfully");
    } else {
      await createSpecialty(data);
      toast.success("Specialty Created Successfully");
    }
    reset();
    router.push("/dashboard/specialties");
  }
  async function handleCreateMany() {
    setIsLoading(true);
    try {
      await createManySpecialties();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full max-w-2xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight  ">
            Create Specialty
          </h1>
          {/* <Button onClick={handleCreateMany}>
            {isLoading ? "Creating..." : "Create Many"}
          </Button> */}
          <Button asChild variant={"outline"}>
            <Link href="/dashboard/specialties">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="Specialty Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter Service title"
          />
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button asChild variant={"outline"}>
            <Link href="/dashboard/specialties">Cancel</Link>
          </Button>
          <Button asChild variant={"outline"}>
            Create Many specialties
          </Button>
          <SubmitButton
            title={editingId ? "Update Specialty" : "Create Specialty"}
            isLoading={isLoading}
            loadingTitle={
              editingId ? "Updating please wait..." : "Saving please wait..."
            }
          />
        </div>
      </form>
    </div>
  );
}
