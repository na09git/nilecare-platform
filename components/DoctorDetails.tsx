"use client";
import { AppointmentProps, DoctorDetail } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getDayFromDate } from "@/utils/getDayFromDate";
import { getLongDate } from "@/utils/getLongDate";
import { MoveRight } from "lucide-react";
import { useForm, UseFormRegister, FieldErrors, UseFormSetError } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextInput from "./FormInputs/TextInput";
import { DatePickerInput } from "./FormInputs/DatePickerInput";
import RadioInput from "./FormInputs/RadioInput";
import { TextAreaInput } from "./FormInputs/TextAreaInput";
import MultipleFileUpload, { FileProps } from "./FormInputs/MultipleFileUpload";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import FrontDoctorDetails from "./FrontDoctorDetails";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Appointment, DoctorProfile, PaymentStatus } from "@prisma/client";

export default function DoctorDetails({
  doctor,
  appointment,
  doctorProfile,
}: {
  doctor: DoctorDetail;
  appointment: Appointment | null;
  doctorProfile: DoctorProfile | null | undefined;

}) {
  const { data: session } = useSession();
  const patient = session?.user;
  const router = useRouter();

  const [isActive, setIsActive] = useState("availability");
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [medicalDocs, setMedicalDocs] = useState<FileProps[]>([]);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const longDate = getLongDate(date!.toDateString());
  const times = doctor.doctorProfile?.availability?.[getDayFromDate(date?.toDateString())] ?? null;

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const initialPaymentDetails: {
    transactionId: string,
    paymentStatus: PaymentStatus,
    paymentMethod: string,
    paidAmount: number,
    reference: string
  } = {
    transactionId: "",
    reference: "",
    paymentStatus: "SUCCESS",
    paymentMethod: "phone",
    paidAmount: 0
  };
  const [paymentDetails, setPaymentDetails] = useState(initialPaymentDetails);

  const configChapa = {
    reference: (new Date()).getTime().toString(),
    email: patient?.email as string,
    amount: doctor.doctorProfile?.hourlyWage ?? 0,
    publicKey: process.env.NEXT_PUBLIC_CHAPA_PUBLIC_KEY || "",
    currency: "ETB",
    callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/verifychapa`, // Redirect URL after successful payment
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/chapa`, // URL for payment verification
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // Add setError
    clearErrors,
  } = useForm<AppointmentProps>({
    defaultValues: {
      email: appointment?.email || (patient?.email as string),
      firstName: appointment?.firstName || patient?.name?.split(" ")[0],
      phone: appointment?.phone ?? "",
      lastName: appointment?.lastName || patient?.name?.split(" ")[1],
      occupation: appointment?.occupation ?? "",
      location: appointment?.location ?? "",
      gender: appointment?.gender ?? "",
      appointmentReason: appointment?.appointmentReason ?? "",
    },
  });

  const handleChapa = async (data: AppointmentProps) => { //Pass data to handleChapa
    setLoading(true); // Start loading before the payment process

    const referenceNumber = uuidv4();
    const header = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    const body = {
      amount: doctor.doctorProfile?.hourlyWage ?? 0,
      currency: "ETB",
      email: data?.email || patient?.email as string,
      first_name: data?.firstName || patient?.name?.split(" ")[0],
      last_name: data?.lastName || patient?.name?.split(" ")[1],
      phone_number: data?.phone ?? "", // Phone number should not include +251
      tx_ref: referenceNumber,
      callback_url: configChapa.callback_url,
      return_url: configChapa.return_url,
      customization: {
        title: "Doctor Appointment",
        description: "Paying for doctor appointment"
      }
    };

    console.log("Chapa Request Body:", body); // Log the request body
    console.log("Chapa Request Headers:", header); // Log the request headers

    try {
      let response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chapa`, body, header);
      // Redirect to Chapa payment page
      console.log("Chapa Response:", response); // Log the entire response

      // window.open(response.data.data.checkout_url, '_blank');
      window.open(response.data.data.checkout_url, '_self');


      // Prepare appointment data for local storage
      const appointmentData = {
        firstName: data?.firstName || patient?.name?.split(" ")[0],
        lastName: data?.lastName || patient?.name?.split(" ")[1],
        phone: data?.phone ?? "",  // appointment?.phone ?? "",
        email: data?.email || patient?.email as string,
        occupation: data?.occupation ?? "", // appointment?.occupation ?? "",
        location: data?.location ?? "", //  appointment?.location ?? "",
        appointmentReason: data?.appointmentReason ?? "", //  appointment?.appointmentReason ?? "",
        gender: data?.gender ?? "", //appointment?.gender ?? "",
        medicalDocuments: medicalDocs.map((item) => item.url),
        appointmentDate: date,
        appointmentFormattedDate: longDate,
        appointmentTime: selectedTime,
        doctorId: doctor.id,
        charge: doctor.doctorProfile?.hourlyWage ?? 0,
        dob: dob,
        patientId: patient?.id ?? "",
        doctorName: doctor.name,
        transactionId: paymentDetails.transactionId,
        paymentStatus: paymentDetails.paymentStatus,
        paymentMethod: paymentDetails.paymentMethod,
        paidAmount: paymentDetails.paidAmount,
        reference: referenceNumber,  // Use the Chapa reference number
      };

      // Store appointment data in local storage
      localStorage.setItem('appointmentData', JSON.stringify(appointmentData));

      // router.push('/chapa');

    } catch (error) {
      console.error("Error initiating Chapa payment:", error);
      toast.error("Payment initiation failed.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  async function onSubmit(data: AppointmentProps) {
    // Manual phone number validation
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(data.phone)) {
      setError("phone", {
        type: "manual",
        message: "Please enter a valid phone number (numbers only)",
      });
      return; // Stop form submission
    } else {
      clearErrors("phone"); // Clear any previous phone number errors
    }

    await handleChapa(data); // Call handleChapa and pass the form data
  }

  function initiateAppointment() {
    if (patient?.id) {
      if (!selectedTime) {
        toast.error("Please select time");
        return;
      }
      setStep((curr) => curr + 1);
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      {step === 1 ? (
        <div className="">
          <div className="flex items-center  justify-between ">
            <button
              onClick={() => setIsActive("details")}
              className={
                isActive === "details"
                  ? "py-4 px-8 w-full uppercase tracking-widest bg-blue-600 text-white"
                  : "border border-gray-200 bg-slate-100 w-full text-slate-800 py-4 px-8 uppercase tracking-widest"
              }
            >
              Doctor Details
            </button>
            <button
              onClick={() => setIsActive("availability")}
              className={
                isActive === "availability"
                  ? "py-4 px-8 w-full bg-blue-600 text-white uppercase tracking-widest"
                  : "border border-gray-200 bg-slate-100 w-full text-slate-800 py-4 px-8 uppercase tracking-widest"
              }
            >
              Availability
            </button>
          </div>
          <div className="py-8 px-6">
            {isActive === "availability" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="">
                  <span className="text-blue-600 text-sm">
                    You have selected
                  </span>
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {longDate}
                  </h2>
                  {times && times.length > 0 && (
                    <div className="py-3 grid grid-cols-4 gap-2">
                      {times.map((item, i) => {
                        return (
                          <Button
                            key={i}
                            onClick={() => setSelectedTime(item)}
                            variant={
                              selectedTime === item ? "default" : "outline"
                            }
                          >
                            {item}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                  <div className="py-4">
                    <button
                      onClick={initiateAppointment}
                      type="button"
                      className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                    >
                      Book Doctor - {" "}
                      {doctor.doctorProfile?.hourlyWage} Birr
                      <MoveRight className="w-6 h-6 ml-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <FrontDoctorDetails doctorProfile={doctorProfile} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 ">
          <form
            className=" py-4 px-4  mx-auto "
            onSubmit={handleSubmit(onSubmit)}
          >
            {step <= 3 &&
              <h2 className="scroll-m-20 border-b pb-3 mb-6 text-3xl font-semibold tracking-tight first:mt-0 ">
                Tell us a few Details about You
              </h2>}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 ">
                  <TextInput
                    label="First Name"
                    register={register}
                    name="firstName"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter First Name"
                  />
                  <TextInput
                    label="Last Name"
                    register={register}
                    name="lastName"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <TextInput
                    label="Phone Number"
                    register={register}
                    name="phone"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter Phone Number"

                  />
                  <TextInput
                    label="Email Address"
                    register={register}
                    name="email"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter Email Address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <TextInput
                    label="Occupation"
                    register={register}
                    name="occupation"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter your Occupation"
                  />
                  <TextInput
                    label="Your Location"
                    register={register}
                    name="location"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter your Location"
                  />
                </div>

                <DatePickerInput
                  date={dob}
                  setDate={setDob}
                  title="Date of Birth"
                  className="col-span-1"
                />

                <RadioInput
                  title="Gender"
                  register={register}
                  name="gender"
                  errors={errors}
                  className="col-span-1"
                  radioOptions={genderOptions}
                />

                <TextAreaInput
                  label="Reason for Seeing the Doctor || Medical History"
                  register={register}
                  name="appointmentReason"
                  errors={errors}
                  placeholder="Enter appointment Reason"
                />


                <MultipleFileUpload
                  label="Medical Documents"
                  files={medicalDocs}
                  setFiles={setMedicalDocs}
                  endpoint="patientMedicalFiles" />


                <Button className="p-4 text-center items-center" type="submit" disabled={loading}>
                  Confirm and Pay to Book Appointment
                </Button>
              </div>


            )}
          </form>
        </div>
      )}

    </>
  )
}
