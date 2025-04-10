"use client";

import React from "react";
import { Doctor } from "@/types/types";
import DoctorCard from "./DoctorCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function DoctorsListCarousel({
  doctors,
  isInPerson,
}: {
  doctors: Doctor[];
  isInPerson?: boolean;
}) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {doctors.map((doctor) => (
          <CarouselItem key={doctor.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="">
              <CardContent className="">
                <DoctorCard doctor={doctor} isInPerson={isInPerson} />
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}