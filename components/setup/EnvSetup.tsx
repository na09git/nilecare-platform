"use client";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { Button } from "../ui/button";
import { createEnv } from "@/actions/save-env";
import toast from "react-hot-toast";

export type EnvVariables = {
  DATABASE_URL: string;
  RESEND_API_KEY: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  UPLOADTHING_SECRET: string;
  UPLOADTHING_APP_ID: string;
  NEXT_PUBLIC_BASE_URL: string;
};

export default function EnvSetup() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { id: "welcome", title: "Welcome" },
    { id: "database", title: "Database" },
    { id: "uploadthing", title: "UploadThing" },
    { id: "nextauth", title: "Next Auth" },
    { id: "resend", title: "Resend Api Key" },
    { id: "finish", title: "Finish" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<EnvVariables>();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: EnvVariables) {
    setLoading(true);
    data.NEXT_PUBLIC_BASE_URL = data.NEXTAUTH_URL;
    try {
      const res = await createEnv(data);
      if (res.status == 200) {
        toast.success("Environmental Variables set successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving environment variables");
      setLoading(false);
    }
  }

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof EnvVariables)[] => {
    switch (steps[step].id) {
      case "database":
        return ["DATABASE_URL"];
      case "uploadthing":
        return ["UPLOADTHING_SECRET", "UPLOADTHING_APP_ID"];
      case "nextauth":
        return ["NEXTAUTH_URL", "NEXTAUTH_SECRET"];
      case "resend":
        return ["RESEND_API_KEY"];
      default:
        return [];
    }
  };

  const renderStep = (currentStep: string) => {
    if (currentStep === "welcome") {
      return (
        <div>
          <h2 className="text-2xl font-bold pb-3 mb-4 border-b">
            Welcome to the Setup Wizard!
          </h2>
          <p className="mb-4">
            These next few steps will help you set up your application.
          </p>
          <p className="mb-4">
            If you'd prefer to do this manually, you can edit the .env file
            directly.
          </p>
          <p>
            If you need help, please refer to the documentation or contact
            support.
          </p>
          <p className="font-bold mt-4">Happy Building!</p>
        </div>
      );
    } else if (currentStep === "database") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Database Configuration</h2>
          <TextInput
            label="Enter your database connection URL."
            register={register}
            name="DATABASE_URL"
            errors={errors}
            placeholder="mongodb+srv://username:password@cluster0.rtxthsv.mongodb.net/myDBName?retryWrites=true&w=majority"
          />
          <p className="text-muted-foreground mt-2 text-sm">
            <b>Hint</b>: Get the URL from MongoDB Atlas. Learn more{" "}
            <a
              href="https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              here
            </a>
            .
          </p>
        </div>
      );
    } else if (currentStep === "uploadthing") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">UploadThing Configuration</h2>
          <TextInput
            label="Uploadthing Secret Key"
            register={register}
            name="UPLOADTHING_SECRET"
            errors={errors}
            placeholder="sk_live_xxxxxxxxxxxxxxx"
          />
          <TextInput
            label="Uploadthing App ID"
            register={register}
            name="UPLOADTHING_APP_ID"
            errors={errors}
            placeholder="5pb583h0ohl"
          />
          <p className="text-muted-foreground mt-2 text-sm">
            <b>Hint</b>: Get the Secret Key and App Id from UploadThing
            dashboard.{" "}
            <a
              href="https://uploadthing.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Access it here
            </a>
            .
          </p>
        </div>
      );
    } else if (currentStep === "nextauth") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">NextAuth Configuration</h2>
          <TextInput
            label="NextAuth URL"
            register={register}
            name="NEXTAUTH_URL"
            errors={errors}
            placeholder="http://localhost:3000"
          />
          <TextInput
            label="NextAuth Secret"
            register={register}
            name="NEXTAUTH_SECRET"
            errors={errors}
            placeholder="your-nextauth-secret"
          />
          <p className="text-muted-foreground mt-2 text-sm">
            <b>Hint</b>: Learn more about NextAuth configuration{" "}
            <a
              href="https://next-auth.js.org/configuration/options"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              in the official docs
            </a>
            .
          </p>
        </div>
      );
    } else if (currentStep === "resend") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Resend API Configuration</h2>
          <TextInput
            label="Resend API Key"
            register={register}
            name="RESEND_API_KEY"
            errors={errors}
            placeholder="re_xxxxx_xxxxx"
          />
          <p className="text-muted-foreground mt-2 text-sm">
            <b>Hint</b>: Get your Resend API Key from the Resend dashboard.{" "}
            <a
              href="https://resend.com/docs/dashboard/api-keys/create-api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Learn how here
            </a>
            .
          </p>
        </div>
      );
    } else if (currentStep === "finish") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
          <p className="mb-4">Great job! You've completed the setup process.</p>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <p className="font-bold">Next Steps:</p>
            <p>1. Review your .env file to ensure all settings are correct.</p>
            <p>
              2. Restart your application with 'npm run dev' to apply the new
              settings.
            </p>
            <p>3. Remove any sensitive setup files for security.</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-100 rounded-lg shadow-lg overflow-hidden min-h-96 grid grid-cols-12 ">
      <div className="col-span-full lg:col-span-4 dark:bg-slate-800 text-slate-50 p-8 bg-slate-900">
        <div className="flex items-center  space-x-4 mb-10">
          <Mail className="w-6 h-6 flex-shrink-0" />
          <h2 className="text-2xl">Medical App</h2>
        </div>
        <ul className="">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`mb-2 ${index === currentStep ? "font-bold" : ""}`}
            >
              <span className="mr-1">{index <= currentStep ? "✓ " : ""}</span>
              <span>{step.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-8 p-8 col-span-full ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* {renderStep(steps[currentStep].id)} */}
          {steps[currentStep].id === "welcome" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Welcome to the Setup Wizard!
              </h2>
              <p className="mb-4">
                These next few steps will help you set up your application.
              </p>
              <p className="mb-4">
                If you'd prefer to do this manually, you can edit the .env file
                directly.
              </p>
              <p>
                If you need help, please refer to the documentation or contact
                support.
              </p>
              <p className="font-bold mt-4">Happy Building!</p>
            </div>
          )}
          {steps[currentStep].id === "database" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Database Configuration
              </h2>
              <TextInput
                label="Enter your database connection URL."
                register={register}
                name="DATABASE_URL"
                errors={errors}
                placeholder="mongodb+srv://username:password@cluster0.rtxthsv.mongodb.net/myDBName?retryWrites=true&w=majority"
              />
              <p className="text-muted-foreground mt-2 text-sm">
                <b>Hint</b>: Get the URL from MongoDB Atlas. Learn more{" "}
                <a
                  href="https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  here
                </a>
                .
              </p>
            </div>
          )}
          {steps[currentStep].id === "uploadthing" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                UploadThing Configuration
              </h2>
              <div className="my-3">
                <TextInput
                  label="Uploadthing Secret Key"
                  register={register}
                  name="UPLOADTHING_SECRET"
                  errors={errors}
                  placeholder="sk_live_xxxxxxxxxxxxxxx"
                />
              </div>
              <TextInput
                label="Uploadthing App ID"
                register={register}
                name="UPLOADTHING_APP_ID"
                errors={errors}
                placeholder="5pb583h0ohl"
              />
              <p className="text-muted-foreground mt-2 text-sm">
                <b>Hint</b>: Get the Secret Key and App Id from UploadThing
                dashboard.{" "}
                <a
                  href="https://uploadthing.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Access it here
                </a>
                .
              </p>
            </div>
          )}
          {steps[currentStep].id === "nextauth" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                NextAuth Configuration
              </h2>
              <TextInput
                label="NextAuth URL"
                register={register}
                name="NEXTAUTH_URL"
                errors={errors}
                placeholder="http://localhost:3000"
              />
              <div className="my-3">
                <TextInput
                  label="NextAuth Secret"
                  register={register}
                  name="NEXTAUTH_SECRET"
                  errors={errors}
                  placeholder="your-nextauth-secret"
                />
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                <b>Hint</b>: Learn more about NextAuth configuration{" "}
                <a
                  href="https://next-auth.js.org/configuration/options"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  in the official docs
                </a>
                .
              </p>
            </div>
          )}
          {steps[currentStep].id === "resend" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Resend API Configuration
              </h2>
              <TextInput
                label="Resend API Key"
                register={register}
                name="RESEND_API_KEY"
                errors={errors}
                placeholder="re_xxxxx_xxxxx"
              />
              <p className="text-muted-foreground mt-2 text-sm">
                <b>Hint</b>: Get your Resend API Key from the Resend dashboard.{" "}
                <a
                  href="https://resend.com/docs/dashboard/api-keys/create-api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Learn how here
                </a>
                .
              </p>
            </div>
          )}
          {steps[currentStep].id === "finish" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
              <p className="mb-4">
                Great job! You've completed the setup process.
              </p>
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                <p className="font-bold">Next Steps:</p>
                <p>
                  1. Review your .env file to ensure that you have all the Keys
                  as in .env.example
                </p>
                <p>
                  2. Restart your application with 'npm run dev' to apply the
                  new settings.
                </p>
                <p>
                  3. Run npx prisma db push : to Sync your modules in the db{" "}
                </p>
                <p>4. Run npm run seed. to create dummy users </p>
              </div>
            </div>
          )}
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext} className="">
                Next
              </Button>
            ) : (
              <>
                {loading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">Finish</Button>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
