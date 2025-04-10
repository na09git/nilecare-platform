"use client";

import React from "react";

const features = [
  { name: 'Dr. Yared Tesfaye', description: 'Specialist in Neurology. Focuses on treating neurological disorders such as epilepsy, stroke, and Parkinson\'s disease.' },
  { name: 'Dr. Mohammed Yasin', description: 'Specialist in Cardiology. Expert in diagnosing and treating heart-related conditions such as heart disease and hypertension.' },
  { name: 'Dr. Amanuel Yohanis', description: 'Specialist in Pediatrics. Experienced in caring for children and managing childhood illnesses, vaccinations, and developmental issues.' },
  { name: 'Dr. Aklilu Meles', description: 'Specialist in Orthopedics. Skilled in treating musculoskeletal problems, including fractures, arthritis, and sports injuries.' },
  { name: 'Dr. Jemal Gamada ', description: 'Specialist in Obstetrics and Gynecology. Expert in women\'s health, including prenatal care, childbirth, and reproductive health.' },
  { name: 'Dr. Abudardah Umar', description: 'Specialist in Surgery. Experienced in performing surgeries for a wide range of conditions, including abdominal and soft tissue surgeries.' },
]


export default function Doctors() {
  return (
    <div className="text-gray-500 bg-white dark:bg-slate-950 ">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">Meet Our NileCare Doctors </h2>
          <p className="mt-4 text-gray-500">
            At NileCare, our doctors are highly skilled professionals with vast experience in their respective specialties. They are dedicated to providing top-quality healthcare services to patients across Ethiopia, ensuring the best care for every individual.     </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900 dark:text-gray-300">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500 ">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            src="/d1.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            src="/d2.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Side of walnut card tray with card groove and recessed card area."
            src="/d3.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src="/d4.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  )
}