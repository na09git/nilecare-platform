"use client";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Facebook, Instagram, Linkedin, LinkedinIcon, Phone, Twitter, Youtube } from "lucide-react";
import React from "react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  const footerNavs = [
    {
      label: "Different Links",
      items: [
        {
          href: "/join/doctors",
          name: "List your Service",
        },
        {
          href: "/onboarding/resume",
          name: "Resume your Application",
        },
        {
          href: "/category?mode=In-person%20doctor%20visit",
          name: "Inperson Visit",
        },
        {
          href: "/category?mode=Telehealth%20visit",
          name: "Telehealth Visit",
        },
        {
          href: "/about",
          name: "About",
        },
        // {
        //   href: "/service",
        //   name: "Services",
        // },
        // {
        //   href: "/publichealth",
        //   name: "NileCare - Public Health",
        // },

      ],
    },
    // {
    //   label: "Links",
    //   items: [
    //     {
    //       href: "/find-doctor",
    //       name: "Find Doctor",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "Support",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "Docs",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "Pricing",
    //     },
    //   ],
    // },
    // {
    //   label: "About",
    //   items: [
    //     {
    //       href: "javascript:void()",
    //       name: "Terms",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "License",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "Privacy",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "About US",
    //     },
    //   ],
    // },
  ];

  const socialLinks = [
    {
      title: "Tiktok",
      href: "https://www.tiktok.com/@nilecare1",
      icon: FaTiktok,
      color: "text-blue-600",
    },
    {
      title: "Youtube",
      href: "https://youtube.com/@nilecare",
      icon: Youtube,
      color: "text-red-600",
    },
    {
      title: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100009045865488",
      icon: Facebook,
      color: "text-blue-400",
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/nilecare1/",
      icon: Instagram,
      color: "text-pink-600",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/nilecare/",
      icon: LinkedinIcon,
      color: "text-pink-600",
    },
    {
      title: "X",
      href: "https://www.x.com/digital_heal",
      icon: TwitterLogoIcon,
      color: "text-pink-600",
    },
  ];

  return (
    <footer className="text-gray-500 bg-white dark:bg-slate-950 px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="gap-6 justify-between md:flex">
        <div className="flex-1">
          <div className="max-w-xs">
            <img src="/nilecare.png" className="w-32" />
            <p className="leading-relaxed mt-2 text-[15px]">
              NileCare is a comprehensive healthcare platform dedicated to providing accessible and reliable healthcare services.

            </p>
          </div>
          <div className="max-w-xs">
            <p className="leading-relaxed mt-2 text-[15px]">
              📲  +251915137219
            </p>
          </div>
          <div className="max-w-xs">

            <p className="leading-relaxed mt-2 text-[15px]">
              🌎   Harar , Ethiopia
            </p>
          </div>
        </div>
        <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
          {footerNavs.map((item, idx) => (
            <ul className="space-y-4" key={idx}>
              <h4 className="text-gray-800 dark:text-gray-300 font-medium">
                {item.label}
              </h4>
              {item.items.map((el, idx) => (
                <li key={idx}>
                  <a
                    href={el.href}
                    className="hover:underline hover:text-indigo-600"
                  >
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} NileCare All rights reserved.
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
            {socialLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <li
                  key={i}
                  className="w-10 h-10 border rounded-full flex items-center justify-center"
                >
                  <a href={item.href} className={item.color}>
                    <Icon className="w-6 h-6" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}