import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NewButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <Button className="text-sm" variant="outline" asChild>
      <Link href={href}>
        <Plus className="w-4 h-4 mr-2" />
        {title}
      </Link>
    </Button>
  );
}
