"use client";
import { deleteService } from "@/actions/services";
import { ServiceProps } from "@/types/types";
import { Service } from "@prisma/client";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { DeletePopup } from "./DeletePopup";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function ServiceCard({ service }: { service: Service }) {
  async function handleDelete(id: string) {
    await deleteService(id);
    toast.success("Specialty Deleted Successfully");
  }
  return (
    <div className="border mb-2 border-gray-100 shadow-sm text-xs bg-white py-3 px-2 w-full rounded-md dark:text-slate-900 flex items-center gap-4 justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={service.imageUrl}
          width={512}
          height={512}
          alt={service.title}
          className="w-14 h-auto"
        />
        <h2>{service.title}</h2>
      </div>
      <div className="flex">
        <Link
          className="text-blue-600"
          href={`/dashboard/services/update/${service.slug}`}
        >
          <Pencil className="w- h-4" />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="text-red-600">
              <Trash className="w- h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Service
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(service.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
