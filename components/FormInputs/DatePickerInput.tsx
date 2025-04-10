"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerInputProps = {
  date: Date | undefined;
  setDate: any;
  className?: string;
  title: string;
};
import { useState } from "react";
import DatePicker from "react-date-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
export function DatePickerInput({
  date,
  setDate,
  className = "col-span-full",
  title,
}: DatePickerInputProps) {
  return (
    <div className={cn("grid", className)}>
      <h2 className="text-base font-normal mb-2">{title}</h2>
      <DatePicker
        className="z-50 rounded-md   border border-slate-300 dark:border-slate-600 ring-0 py-1.5 px-3 dark:text-slate-50"
        onChange={setDate}
        value={date}
        // calendarIcon={Calendar}
      />
    </div>
  );
}
