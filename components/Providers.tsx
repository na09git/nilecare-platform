"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { HMSRoomProvider } from "@100mslive/react-sdk";
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <HMSRoomProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </HMSRoomProvider>
    </SessionProvider>
  );
}
