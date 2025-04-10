import { Check, HelpCircle } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
export default function Pricing() {
  const plans = [
    {
      name: "NileCare Free Plan",
      desc: "Empower your healthcare practice with essential tools for online consultations and patient engagement. 🌟",
      price: 0,
      fee: 0,
      isMostPop: true,
      features: [
        "Unlimited online consultations 📞",
        "Efficient patient record management 🗂️",
        "Receive appreciation gifts directly from patients 🎁",
        "Timely email notifications for appointments ✉️",
        "Customizable doctor profiles to build trust 👩‍⚕️👨‍⚕️",
      ],
      getStarted: "/register?role=DOCTOR&plan=free",
    },
    // {
    //     name: "Standard Plan",
    //     desc: "Ideal for clinics and specialists aiming to grow their practice.",
    //     price: 0,
    //     fee: 0,
    //     isMostPop: true,
    //     features: [
    //         "Streamline your online consultations",
    //         "Advanced tools for managing patient records",
    //         "SMS reminders to enhance patient engagement",
    //         "Customizable doctor profile to attract more patients",
    //         "Dedicated support for managing appreciation gifts",
    //     ],
    //     getStarted: "/register?role=DOCTOR&plan=professional",
    // },
    // {
    //     name: "Enterprise",
    //     desc: "Tailored for large healthcare institutions and hospitals.",
    //     price: 99,
    //     fee: 0,
    //     isMostPop: false,
    //     features: [
    //         "All features from the Standard Plan",
    //         "Multi-provider support",
    //         "Priority customer support",
    //         "Integration with electronic health records (EHR) systems",
    //     ],
    //     getStarted: "/register?role=DOCTOR&plan=enterprise",
    // },
  ];

  return (
    <section className="py-14 items-center justify-center">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-800 dark:text-slate-300  sm:text-4xl">
            Simple Pricing for Every Healthcare Provider 💼

          </h3>
          <div className="mt-3 max-w-xl">
            <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-slate-400">
              Join NileCare to simplify your practice, connect with patients, and focus on what matters most—delivering exceptional care. 💙
            </p>
          </div>
        </div>
        <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${item.isMostPop ? "mt-10" : ""
                }`}
            >
              {item.isMostPop ? (
                <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">
                  🌟 Most Popular
                </span>
              ) : (
                ""
              )}
              <div className="p-8 space-y-4 border-b mt-9">
                <span className="text-indigo-600 font-bold uppercase tracking-widest ">
                  {item.name}
                </span>
                <div className="text-gray-800 dark:text-gray-300 text-3xl font-semibold">
                  Free{" "}
                  <span className="text-xl text-gray-600 font-normal">/mo</span>
                </div>
                <p className="text-xs">{item.desc}</p>
                <div className="flex">
                  {/* <p>+5% transaction fee</p> */}
                  <p>
                    Receive appreciation gifts from your patients—add your phone number and bank account to get started! 💰🎁❤️
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <HelpCircle className="w-4 h-4 ms-2" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-900 text-white text-xs">
                        <p style={{ color: "#4F46E5", fontWeight: "bold" }}>
                          Enable gifts and receive <span style={{ color: "#22C55E" }}>money 💰</span> by linking your <span style={{ color: "#F59E0B" }}>Chapa</span>/
                          <span style={{ color: "#DB2777" }}>CBE account</span> and connecting with your patients seamlessly. 🌐
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Link
                  href={item.getStarted}
                  className="px-3 block text-center py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
                >
                  🚀  Get Started
                </Link>
              </div>
              <ul className="p-8 space-y-3">
                <li className="pb-2 text-gray-800 dark:text-gray-500 font-medium">
                  <p> 🌟 Features</p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <Check className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}