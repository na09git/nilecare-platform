"use client";

import React from "react";
import Image from "next/image";
import { Dropdown } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Power,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Settings,
  ExternalLink,
  User2,
  Pencil,
  Mail,
  DollarSign,
  AlarmClock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ModeToggle from "../ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import generateSlug from "@/utils/generateSlug";
import { cn } from "@/lib/utils";
// import { User } from "@prisma/client";
// import { User } from "next-auth";
export default function NavBar({ session }: { session: Session }) {
  const user = session.user;
  const router = useRouter();
  const role = user?.role;
  const id = user.id;
  const slug = generateSlug(user.name ?? "");
  const pathname = usePathname();
  const roles = {
    USER: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "My Appointments",
        path: "/dashboard/user/appointments",
        icon: AlarmClock,
      },
      { title: "Doctors", path: "/dashboard/user/doctors", icon: Users },
      { title: "Inbox", path: "/dashboard/user/inbox", icon: Mail },
      // {
      //   title: "Settings",
      //   path: "/dashboard/user/settings",
      //   icon: Settings,
      // },
    ],
    ADMIN: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Services", path: "/dashboard/services", icon: Users },
      { title: "Specialties", path: "/dashboard/specialties", icon: Users },
      { title: "Symptoms", path: "/dashboard/symptoms", icon: Users },
      { title: "Doctors", path: "/dashboard/doctors", icon: Users },
      { title: "Patients", path: "/dashboard/patients", icon: Users },
      { title: "Appointments", path: "/dashboard/appointments", icon: Users },
      {
        title: "Sales",
        path: "/dashboard/sales",
        icon: DollarSign,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: Settings,
      },
    ],
    DOCTOR: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "Appointments",
        path: "/dashboard/doctor/appointments",
        icon: AlarmClock,
      },
      {
        title: "Sales",
        path: "/dashboard/doctor/sales",
        icon: DollarSign,
      },
      { title: "Patients", path: "/dashboard/doctor/patients", icon: Users },
      { title: "Inbox", path: "/dashboard/doctor/inbox", icon: Mail },
      {
        title: "Compose Mail",
        path: "/dashboard/doctor/compose",
        icon: Pencil,
      }, {
        title: "Profile",
        path: `/dashboard/doctor/profile/${id}`,
        icon: User2,
      },
      {
        title: "Live Preview",
        path: `/doctors/${slug}?id=${id}`,
        icon: ExternalLink,
      },
      {
        title: "Settings",
        path: "/dashboard/doctor/settings",
        icon: Settings
        ,
      },
    ],
  };

  let sideBarLinks = roles[role] || [];

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">NileCare</span>
            </Link>
            <Link
              href="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            {sideBarLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.path ? " bg-muted text-primary  " : ""
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                  {/* {item.badgeCount && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.badgeCount}
                    </Badge>
                  )} */}
                </Link>
              );
            })}

            {/* <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Analytics
            </Link> */}


          </nav>
          <div className="mt-auto">

            <div className="mt-auto ">
              <Button size="sm" className="w-full">
                <Power className="w- h-4 mr-1" />
                Logout
              </Button>
            </div>

          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            /> */}
          </div>
        </form>
      </div>
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name ?? "NileCare User"} />
            ) : (
              <AvatarFallback>CN</AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-center">
            {user.name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
