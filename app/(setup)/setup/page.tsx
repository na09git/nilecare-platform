import EnvSetup from "@/components/setup/EnvSetup";
import React from "react";

export default function page() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-32 font-sans">
      <div className="container">
        <EnvSetup />
      </div>
    </div>
  );
}
