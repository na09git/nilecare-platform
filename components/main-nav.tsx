"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

import { Microscope } from "lucide-react";
import { docsConfig } from "@/config/docs";
import Logo from "./Frontend/Logo";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Logo />
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {docsConfig.mainNav?.map((item, i) => {
          return (
            <Link
              key={i}
              href={item.href ?? "#"}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
