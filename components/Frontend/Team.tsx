"use client";

import React from "react";

const people = [
  {
    name: 'Anwar Mohammed',
    role: 'Co-Founder / CEO of NileCare',
    imageUrl: "anwar.jpg",
  },

  {
    name: 'Dr Abdurehim NurAhmed',
    role: 'Medical Director at NileCare',
    imageUrl: "abdu.jpg",
  },

  {
    name: 'Dr Salahudin Mohammed',
    role: 'Project Manager at NileCare',
    imageUrl: "/salah.jpg",
  },
  {
    name: 'Dr Muhammad Ibrahim',
    role: 'Quality Assurance Manager at NileCare',
    imageUrl: "/mame.jpg",
  },


]

export default function Team() {
  return (
    <div className=" text-gray-500 bg-white  dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-gray-300 sm:text-4xl">
            Meet the Leadership of NileCare
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600 ">
            At NileCare, we are a passionate and dynamic team committed to delivering
            exceptional results for our clients. Our leadership brings together a diverse set of skills,
            expertise, and a shared vision for excellence in healthcare.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img alt="" src={person.imageUrl} className="size-16 rounded-full" />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-300">{person.name}</h3>
                  <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}