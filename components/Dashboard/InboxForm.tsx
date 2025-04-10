"use client";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import { Service, User } from "@prisma/client";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { Options } from "react-tailwindcss-select/dist/components/type";
import { InboxProps } from "@/types/types";
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { createInboxMessage } from "@/actions/inbox";
const QuillEditor = dynamic(
  () => import("@/components/FormInputs/QuillEditor"),
  {
    ssr: false,
  }
);
export type ServiceProps = {
  title: string;
  imageUrl: string;
  slug: string;
};

export default function InboxForm({
  title,
  initialData,
  users,
  session,
}: {
  title: string;
  initialData?: Service;
  users: Options;
  session: Session | null;
}) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InboxProps>();
  const router = useRouter();
  async function onSubmit(data: InboxProps) {
    data.recieverId = selectedUser.value;
    data.senderId = session?.user?.id ?? "";
    data.senderName = session?.user?.name ?? "";
    data.senderEmail = session?.user?.email ?? "";
    data.body = content;
    setIsLoading(true);
    console.log(data);
    try {
      const res = await createInboxMessage(data);
      if (res.status === 201) {
        reset();
        setIsLoading(false);
        toast.success("message sent successfully");
        router.push(
          `/dashboard/${
            session?.user.role === "DOCTOR" ? "doctor" : "user"
          }/inbox`
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="w-full max-w-2xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight  ">
            {title}
          </h1>
          <Button type="button" asChild variant={"outline"}>
            <Link href="/dashboard/doctor/inbox">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <FormSelectInput
            label="Recipients"
            options={users}
            option={selectedUser}
            setOption={setSelectedUser}
          />
          <TextInput
            label="Subject"
            register={register}
            name="subject"
            errors={errors}
            placeholder="Enter Subject"
          />
          <QuillEditor
            label="Write the Content of Message"
            className="w-full"
            value={content}
            onChange={setContent}
          />
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button type="button" asChild variant={"outline"}>
            <Link href="/dashboard/doctor/inbox">Cancel</Link>
          </Button>

          <SubmitButton
            title={editingId ? "Update Message" : "Create Message"}
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
