import { Speciality } from "@prisma/client";
import Link from "next/link";
import React from "react";

type LinkCardsProps = {
  className?: string;
  specialties: Speciality[];
};
export default function LinkCards({ className, specialties }: LinkCardsProps) {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-6 ">
      {specialties.map((item) => {
        return (
          <Link
            key={item.id}
            href={`/specialty/${item.slug}`}
            className={`rounded-md py-3 border bg-slate-100 px-6 flex gap-4 border-blue-500 dark:border-slate-600 dark:bg-slate-800 text-slate-900 dark:text-slate-300 ${className} justify-between`}
          >
            <h2 className="text-sm">{item.title}</h2>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        );
      })}
    </div>
  );
}
