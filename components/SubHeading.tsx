import React from "react";

export default function SubHeading({ title }: { title: string }) {
  return (
    <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2 font-semibold ">
      {title}
    </h2>
  );
}
