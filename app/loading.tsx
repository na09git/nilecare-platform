"use client";
import Lottie from "lottie-react";
import React from "react";
import LoaderAnimation from "../public/animations/heartbeat.json";
export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[400px] ">
          <Lottie animationData={LoaderAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
}
