"use server";

import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { EnvVariables } from "@/components/setup/EnvSetup";

export async function createEnv(newVariables: EnvVariables) {
  try {
    // const newVariables = await request.json();
    const envPath = path.join(process.cwd(), ".env");
    let existingVariables: { [key: string]: string } = {};

    try {
      const envFile = await fs.readFile(envPath, "utf-8");
      existingVariables = dotenv.parse(envFile);
    } catch (error) {
      console.log(
        "No existing .env file found or unable to read it. Creating a new one."
      );
    }
    const updatedVariables = { ...existingVariables, ...newVariables };
    const envContent = Object.entries(updatedVariables)
      .map(([key, value]) => `${key}="${value}"`)
      .join("\n");

    await fs.writeFile(envPath, envContent, "utf-8");

    console.log("Environment variables updated successfully");
    return { message: "Environment variables saved successfully", status: 200 };
  } catch (error) {
    console.error("Error saving environment variables:", error);
    return {
      message: "Failed to save environment variables",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    };
  }
}
