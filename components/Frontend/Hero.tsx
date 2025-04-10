import React, { useState } from "react";
import TransitionalText from "./TransitionalText";
import { Pill } from "lucide-react";
import { CommandMenu } from "../command-menu";
import { getServices } from "@/actions/services";
import SearchBar from "./SearchBar";
// import SearchBar from "../SearchBar";

const Hero = async () => {
  const services = (await getServices()).data || [];
  // console.log(services)

  const TEXTS = ["Massage", "Dental", "Cosmetic", "Dietitian","Cardiology",  "Pediatrics",  "Dermatology",  "Mental Health",  "Neurology",  "Orthopedics",  "Obstetrics",  "Gynecology",  "Allergy Care",  "Telehealth",  "General Practice"];
  return (
    <div className="bg-blue-950 dark:bg-slate-950">
      <div className="relative  pb-[110px] pt-[50px] dark:bg-dark lg:pt-[50px] max-w-6xl mx-auto ">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-gray-50 dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl flex flex-wrap items-center gap-3">
                  <span>Book your</span>{" "}
                  <TransitionalText className="text-blue-500" TEXTS={TEXTS} />
                  <br />
                  <span>sessions now</span>
                </h1>
                <p className="mb-8 max-w-[480px] text-base text-gray-100 dark:text-gray-50-6">
                  Healthcare shouldn't be complicated. We're here to make it simple, clear, and accessible—giving you the support you deserve every step of the way.
                </p>
                {/* SEARCH BAR HERE */}
                {/* <SearchBar /> */}
                <div className="w-full flex-1  md:flex-none">
                  <SearchBar />
                </div>
                {/* CTA BTNS */}
                <ul className="flex flex-wrap items-center mt-6">
                  <li>
                    <a
                      href="/#"
                      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-700 lg:px-7"
                    >
                      Need Doctor Urgently
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      className=" inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-gray-50 hover:text-blue-500 dark:text-white"
                    >
                      <span className="mr-2">
                        <Pill className="flex-shrink-0 h-5 w-5 text-blue-600" />
                      </span>
                      Need a Refill
                    </a>
                  </li>
                </ul>
                <div className="py-4 pt-8 flex gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-bold text-gray-50">Many</span>
                    <span className="text-sm text-gray-400">
                      Active Specialists
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-bold text-gray-50">Many</span>
                    <span className="text-sm text-gray-400">
                      Active Patients
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-5/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="/hero-doctor.jpg"
                    alt="hero"
                    className="max-w-full lg:ml-auto"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

const SingleImage = ({ href, imgSrc }: { href: string; imgSrc: string }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};
