"use client";
import Link from "next/link";
import TextInput from "../FormInputs/TextInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "@/types/types";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Button } from "../ui/button";
import Image from "next/image";
import SignupCarousel from "../Frontend/SignupCarousel";
import Logo from "../Frontend/Logo";

export default function LoginFormWithBg() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();
  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setIsLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setShowNotification(true);
      } else {
        // Sign-in was successful
        setShowNotification(false);
        reset();
        setIsLoading(false);
        toast.success("Login Successful");
        router.push(returnUrl);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }
  return (
    <div className="w-full lg:grid h-96 lg:min-h-[600px] lg:grid-cols-2 relative">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="absolute top-5 left-5">
            <Logo />
          </div>
          <div className="grid gap-2 ">
            <h1 className="text-3xl font-bold">Login to your Account</h1>
            <p className="text-balance text-muted-foreground text-sm mb-4">
              Welcome Back to NileCare
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {showNotification && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Sign-in error!</span> Please Check
                your credentials
              </Alert>
            )}
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. anwar@gmail.com"
            />
            <TextInput
              label="Password"
              register={register}
              page="login"
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
            />

            <SubmitButton
              title="Login"
              isLoading={isLoading}
              loadingTitle="Logging you in please wait..."
            />
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {/* <Image
          src="/images/signup.webp"
          alt="Image"
          width="1500"
          height="1000"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
        <SignupCarousel />
      </div>
    </div>
  );
}
