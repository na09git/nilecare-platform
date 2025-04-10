import CustomButton from "@/components/CustomButton";
import CustomAccordion, { FAQItem } from "@/components/Frontend/CustomAccodion";
import Pricing from "@/components/Frontend/Pricing";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  const features = [
    "NileCare brings patients to you",
    "Seamless e-prescribing experience",
    "Integrated clinical note-taking",
  ];
  const steps = [
    "List your practice",
    "Create competitive offerings",
    "Start seeing patients",
  ];
  const cards = [
    {
      title: " Begin Your Journey",
      description: "Start a new application to join our network of healthcare providers.",
      link: "/register?role=DOCTOR&plan=free",
      linkTitle: "Start a new application",
    },
    {
      title: "Resume Application",
      description: "Pick up where you left off and complete your onboarding process.Schedule for Physical Approval",
      link: "/onboarding/resume",
      linkTitle: "Continue your Application",
    },
    {
      title: " Schedule a Call",
      description: "Arrange a time for a call to finalize your application",
      link: "tel:+251915137219",
      linkTitle: "Schedule a Call",
    },
    {
      title: " Truck your Progress",
      description: "Monitor the status of your application and approvals in real-time..",
      link: "/onboarding/resume",
      linkTitle: "Check Status",
    },
  ];
  const faqs: FAQItem[] = [
    {
      qn: "What is NileCare Doctors Consultation Platform ?",
      ans: (
        <div>
          NileCare is an online platform designed to connect patients with healthcare providers seamlessly. It offers features like appointment booking, e-prescriptions, and health awareness campaigns in local languages.
        </div>
      ),
    },
    {
      qn: "How can I join NileCare as a healthcare provider ?",
      ans: (
        <div>
          You can join NileCare by visiting our website and clicking on{" "}
          <CustomButton
            title="Join Now"
            href="/register?role=DOCTOR"
            className="bg-blue-600 hover:bg-blue-800"
          />{" "}
          to start your application process. Follow the guided steps to complete your registration.
        </div>
      ),
    },
    {
      qn: "What services does NileCare offer to healthcare providers ?",
      ans: (
        <div>
          NileCare offers appointment management, online consultations, e-prescriptions, and a platform to connect with patients effectively. It helps providers grow their practice by streamlining operations and enhancing patient engagement. Plus, providers can receive thoughtful gifts from patients as a token of appreciation! 🎁👩‍⚕️💙
        </div>
      ),
    },
    {
      qn: "Is NileCare available in my area ?",
      ans: (
        <div>
          Currently, NileCare operates in Ethiopia, with plans to expand to other regions soon. Stay connected for updates on our service areas.
        </div>
      ),
    },
    {
      qn: "How does NileCare prioritize patient data security ?",
      ans: (
        <div>
          NileCare employs advanced security protocols and encryption technologies to ensure all patient data is secure and complies with industry standards for confidentiality and privacy.
        </div>
      ),
    },
    {
      qn: "Can patients access services in local languages ?",
      ans: (
        <div>
          Yes, one of NileCare's core missions is to create health awareness and provide services in local languages, ensuring accessibility for diverse communities.
        </div>
      ),
    },
    {
      qn: "What are the benefits of using NileCare for patients ?",
      ans: (
        <div>
          Patients can enjoy easy appointment booking, online consultations, access to specialist doctors, and reliable health information through our awareness campaigns.
        </div>
      ),
    },
    {
      qn: "How can I contact NileCare support ?",
      ans: (
        <div>
          Our support team is available to assist you. You can contact us directly via email (nilecare12@gmail.com), phone (+251915137219), or through our support portal on the website.
        </div>
      ),
    },

  ];
  return (
    <div className="min-h-screen">
      <section className="py-12 px-4">
        <div className="max-w-6xl gap-4 mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
              Build a thriving{" "}
              <span className="text-blue-600 font-semibold">Direct-Pay</span>{" "}
              Practice with NileCare Online  Medical App.
            </h2>
            <p className="py-4">
              Welcome to NileCare Doctors Consultation Platform, where connecting with patients
              is made easier than ever before. Our platform streamlines the process of
              managing appointments, providing care remotely, and keeping track of patient records.
            </p>
            <CustomButton
              title="List your Service"
              href="/join/doctors"
              className="bg-blue-600 dark:bg-slate-200 hover:bg-blue-800"
            />
            <div className="py-6">
              {features.map((feature, i) => {
                return (
                  <p key={i} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                    {feature}
                  </p>
                );
              })}
            </div>
          </div>
          <Image
            src="/doctor.jpg"
            alt=""
            width={1170}
            height={848}
            className="w-full"
          />
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">

          <iframe width="560" height="315" src="https://www.youtube.com/embed/-9i4OoqN8rk?si=5o39nYjYbydv8oLN"  title="YouTube video player - register on Nilcare as service provider guide video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          >

          </iframe>

                  <div className="">
            <h2 className="sm:text-3xl text-2xl ">
              Join NileCare  to increase your
              <span className="text-blue-600 font-semibold mx-2">
                revenue
              </span>{" "}
              today.
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 py-6">

              {cards.map((card, i) => {
                return (
                  <div
                    key={i}
                    className="bg-blue-900 p-4 rounded-lg shadow-2xl text-center"
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-gray-200 text-xs py-3">
                      {card.description}
                    </p>
                    <CustomButton
                      title={card.linkTitle}
                      href={card.link}
                      className="bg-blue-600 hover:bg-blue-800"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 items-center justify-center">
        <div className="max-w-6xl gap-4 mx-auto ">
          <Pricing />
        </div>
      </section>
      <section className="py-12 px-4">
        <h2 className="text-blue-600 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center align-center p-4">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl gap-4 mx-auto ">
          <CustomAccordion FAQS={faqs} />
        </div>
      </section>
    </div>
  );
}