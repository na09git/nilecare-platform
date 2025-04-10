"use client";
import { cn } from "@/lib/utils";
import { DoctorStatus } from "@prisma/client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ShadSelectInput from "../FormInputs/ShadSelectInput";
import { Button } from "../ui/button";
import SelectInput from "../FormInputs/SelectInput";
import { updateDoctorProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApproveBtn({
  status,
  profileId,
}: {
  status: DoctorStatus;
  profileId: string;
}) {
  const router = useRouter();
  const options = [
    {
      label: "PENDING",
      value: "PENDING",
    },
    {
      label: "APPROVED",
      value: "APPROVED",
    },
    {
      label: "REJECTED",
      value: "REJECTED",
    },
  ];
  const initialOption = status;
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [loading, setLoading] = useState(false);
  console.log(selectedOption);
  async function updateStatus() {
    setLoading(true);
    const data = {
      status: selectedOption,
    };
    // setLoading(false);
    // console.log(data);
    try {
      const res = await updateDoctorProfile(profileId, data);
      if (res?.status === 201) {
        toast.success("Doctor Status Changed Successfully");
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "py-1.5 px-3 rounded-md text-xs",
            status === "APPROVED"
              ? "bg-green-500 text-white"
              : status === "PENDING"
              ? "bg-orange-400"
              : "bg-red-500 text-white"
          )}
        >
          {status}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve the Doctor</DialogTitle>
          <DialogDescription>
            <div className="py-4">
              <ShadSelectInput
                label="Status"
                optionTitle="Status"
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
            <DialogFooter>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating please wait...
                </Button>
              ) : (
                <Button onClick={updateStatus} type="submit">
                  Save changes
                </Button>
              )}
            </DialogFooter>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
