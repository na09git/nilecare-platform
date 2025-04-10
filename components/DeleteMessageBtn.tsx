"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteMessage } from "@/actions/inbox";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";

export default function DeleteMessageBtn({
  id,
  role,
}: {
  id: string | undefined;
  role: UserRole | undefined;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    setLoading(true);
    try {
      const res = await deleteMessage(id as string);
      if (res.ok) {
        setLoading(false);
        router.replace(
          role === "DOCTOR"
            ? "/dashboard/doctor/inbox"
            : "/dashboard/user/inbox"
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {loading ? (
            <Button disabled variant="ghost" size="icon">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="sr-only">Deleting</span>
            </Button>
          ) : (
            <Button onClick={handleDelete} variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete Message</span>
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          {loading ? "Deleting" : "Delete Message"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
