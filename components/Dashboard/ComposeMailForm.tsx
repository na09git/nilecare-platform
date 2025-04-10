"use client";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import Link from "next/link";
import { File, Paperclip, X, XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { sendEmail } from "@/actions/mails";
import MultipleFileUpload, {
  FileProps,
} from "../FormInputs/MultipleFileUpload";
import { FaFilePdf, FaImage } from "react-icons/fa";
const QuillEditor = dynamic(
  () => import("@/components/FormInputs/QuillEditor"),
  {
    ssr: false,
  }
);
export type MailProps = {
  to: string;
  subject: string;
  html: string;
  attachments: FileProps[];
};

export default function ComposeMailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [bodyErr, setBodyErr] = useState("");
  const [files, setFiles] = useState<FileProps[]>([]);
  function handleImageRemove(fileIndex: any) {
    const updatedFiles = files.filter((file, index) => index !== fileIndex);
    setFiles(updatedFiles);
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MailProps>();
  const router = useRouter();
  async function onSubmit(data: MailProps) {
    setBodyErr("");
    if (!content || content === "<p><br></p>") {
      setBodyErr("Please Write something in the body");
      return;
    }
    data.html = content;
    data.attachments = files;
    console.log(data);
    try {
      setIsLoading(true);
      const res = await sendEmail(data);
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Email Sent Successfully");
        reset();
        setContent("");
        setFiles([]);
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
            New Message
          </h1>
          <Button type="button" asChild variant={"outline"}>
            <Link href="/dashboard">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="To"
            register={register}
            name="to"
            errors={errors}
            placeholder="Enter Recipient email eg: anwar@gmail.com"
          />
          <TextInput
            label="Subject"
            register={register}
            name="subject"
            errors={errors}
            placeholder="Enter Subject"
          />
          <QuillEditor
            label="Write the Mail Content here"
            className="w-full"
            value={content}
            onChange={setContent}
            error={bodyErr ? bodyErr : ""}
          />
        </div>
        <div className="pt-4">
          <h2 className="pb-2 ">Attachments</h2>
          {files && files.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
              {files.map((file, i) => {
                const extension = file.title.split(".")[1];
                return (
                  <div key={i} className="relative mb-6">
                    <button
                      type="button"
                      onClick={() => handleImageRemove(i)}
                      className="absolute -top-4 -right-2 bg-slate-100 text-red-600 rounded-full "
                    >
                      <XCircle className="" />
                    </button>
                    <div className="py-2 rounded-md px-6 bg-white dark:bg-slate-800 text-slate-800 flex items-center dark:text-slate-200 border border-slate-200">
                      {extension === "pdf" ? (
                        <FaFilePdf className="w-6 h-6 flex-shrink-0 mr-2 text-red-500" />
                      ) : (
                        <FaImage className="w-6 h-6 flex-shrink-0 mr-2 text-gray-600" />
                      )}

                      <div className="flex flex-col">
                        <span className="line-clamp-1">{file.title}</span>
                        {file.size > 0 && (
                          <span className="text-xs">
                            {(file.size / 1000).toFixed(2)}kb
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant={"outline"}>
                <Paperclip className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload your Files</DialogTitle>
              </DialogHeader>
              <MultipleFileUpload
                label="Add attachments"
                files={files}
                setFiles={setFiles}
                endpoint="mailAttachments"
              />
            </DialogContent>
          </Dialog>

          <SubmitButton
            title={"Send Mail"}
            isLoading={isLoading}
            loadingTitle={"Saving please wait..."}
          />
        </div>
      </form>
    </div>
  );
}
