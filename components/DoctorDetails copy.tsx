"use client";
import { AppointmentProps, DoctorDetail } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getDayFromDate } from "@/utils/getDayFromDate";
import { getLongDate } from "@/utils/getLongDate";
import { CalendarDays, Check, DollarSign, Loader2, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import TextInput from "./FormInputs/TextInput";
import { DatePickerInput } from "./FormInputs/DatePickerInput";
import RadioInput from "./FormInputs/RadioInput";
import { TextAreaInput } from "./FormInputs/TextAreaInput";
import MultipleFileUpload, { FileProps } from "./FormInputs/MultipleFileUpload";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { createAppointment } from "@/actions/appointments";
import { Appointment, DoctorProfile, PaymentStatus } from "@prisma/client";
import FrontDoctorDetails from "./FrontDoctorDetails";
import { createRoom } from "@/actions/hms";
import { createSale } from "@/actions/sales";
import Image from "next/image";
import Script from "next/script";

//Paystack
import { usePaystackPayment } from "react-paystack";
import ChapaCheckout from "@chapa_et/inline.js";
// const ChapaCheckout = require('@chapa_et/inline.js');

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
  const params = useSearchParams();

  const [isActive, setIsActive] = useState("availability");
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [medicalDocs, setMedicalDocs] = useState<FileProps[]>([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const day = getDayFromDate(date?.toDateString());
  const longDate = getLongDate(date!.toDateString());
  // console.log(longDate);
  const times = doctor.doctorProfile?.availability?.[day] ?? null;

  const [chapaCheckout, setChapaCheckout] = useState<any>(null);


  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];
  // const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const id = params.get("id");
  const [isClient, setIsClient] = useState(false);
  const initialPaymentDetails:
    {
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
  }
  const [paymentDetails, setPaymentDetails] = useState(initialPaymentDetails);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: appointment?.email || (patient?.email as string),
    amount: doctor.doctorProfile?.hourlyWage ?? 0,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    currency: "GHS",
  };
  const configChapa = {
    reference: (new Date()).getTime().toString(),
    email: appointment?.email || (patient?.email as string),
    amount: doctor.doctorProfile?.hourlyWage ?? 0,
    publicKey: process.env.NEXT_PUBLIC_CHAPA_PUBLIC_KEY || "",
    currency: "ETB",
    callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/verifychapa`, // Redirect URL after successful payment
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/chapa`, // URL for payment verification
  };

  // Simulate an API call to verify payment after the user is redirected back with tx_ref
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');

    if (paymentStatus === 'success') {
      verifyPayment(urlParams.get('tx_ref') || '');
    }
  }, []);

  // Function to verify payment via API
  const verifyPayment = async (tx_ref: string) => {
    try {
      const response = await fetch(`/api/verifychapa?tx_ref=${tx_ref}`);
      const data = await response.json();

      if (data.success) {
        setPaymentSuccess(true); // Update paymentSuccess to true on success
      } else {
        setPaymentSuccess(false);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setPaymentSuccess(false);
    }
  };

  // Chapa payment integration
  const handleChapa = async () => {
    const referenceNumber = uuidv4();
    const header = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    const body = {
      amount: doctor.doctorProfile?.hourlyWage ?? 0,
      currency: "ETB",
      email: appointment?.email || (patient?.email as string),
      first_name: appointment?.firstName || patient?.name?.split(" ")[0],
      last_name: appointment?.lastName || patient?.name?.split(" ")[1],
      phone_number: appointment?.phone ?? "", // Phone number should not include +251
      tx_ref: referenceNumber,
      callback_url: configChapa.callback_url,
      return_url: configChapa.return_url,
      customization: {
        title: "Doctor Appointment",
        description: "Paying for doctor appointment"
      }
    };

    try {
      let response = await axios.post(`http://localhost:3000/api/chapa`, body, header);
      // Redirect to Chapa payment page
      window.open(response.data.data.checkout_url, '_blank');

    } catch (error) {
      console.error("Error initiating Chapa payment:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);


  // you can call this function anything
  const onSuccess = (ref: any) => {

    setPaymentDetails({
      transactionId: ref.transaction,
      reference: ref.reference,
      paymentStatus: "SUCCESS",
      paymentMethod: "Mobile Money",
      paidAmount: doctor.doctorProfile?.hourlyWage ?? 0,

    });
    setPaymentSuccess(true)
    console.log('Paymnet ref: ', ref);

  };
  console.log('Paymnet Details: ', paymentDetails);

  // you can call this function anything
  const onClose = () => {
    console.log('Payment closed')
  }

  const initializePayment = usePaystackPayment(config);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentProps>({
    defaultValues: {
      email: appointment?.email || (patient?.email as string),
      firstName: appointment?.firstName || patient?.name?.split(" ")[0],
      phone: appointment?.phone ?? "",
      lastName: appointment?.lastName || patient?.name?.split(" ")[1],
      occupation: appointment?.occupation ?? "",
      location: appointment?.location ?? "",
      gender: appointment?.gender ?? "",
    },
  });
  async function onSubmit(data: AppointmentProps) {
    //  change this pdf to NileCare pdf 
    data.medicalDocuments = medicalDocs.map((item) => item.url) || [
      "https://i3xnck6xv3.ufs.sh/f/6yE5Wak1AykcFDJpROyHNeSrW97Da3Zlqop1dyzJC8O0ViRT",
    ];
    console.log("Medical Documents:", medicalDocs);
    data.appointmentDate = date;
    data.appointmentFormattedDate = longDate;
    data.appointmentTime = selectedTime;
    (data.doctorId = doctor.id),
      (data.charge = doctor.doctorProfile?.hourlyWage ?? 0);
    data.dob = dob;
    console.log("Selected Date of Birth:", dob);

    data.patientId = patient?.id ?? "";
    data.doctorName = doctor.name;

    //Update patient Details
    data.transactionId = paymentDetails.transactionId;
    data.paymentStatus = paymentDetails.paymentStatus;
    data.paymentMethod = paymentDetails.paymentMethod;
    data.paidAmount = paymentDetails.paidAmount;
    data.reference = paymentDetails.reference;

    // Display Data
    console.log('Appoointment Data:', data);

    try {
      console.log('-------------  try Catch started -----------------');
      setLoading(true);
      // Initiate Chapa payment on form submission
      await handleChapa();
      // Generate room ands the room id
      const doctorFirstName = doctor.name.split(" ")[0];
      console.log("Doctor First Name:", doctorFirstName);
      const patientFirstName = patient?.name?.split(" ")[0];
      const roomName = `Dr. ${doctorFirstName} - ${patientFirstName} Meeting Appointment`;

      // Create a room
      const roomData = await createRoom(roomName);
      console.log('Room Data:', roomData);

      if (roomData.error) {
        toast.error(roomData.error);
        return;
      }
      const meetingLink = `/meeting/${roomData.roomId}`;
      data.meetingLink = meetingLink;
      console.log('MeetingLink:', meetingLink);

      // Create a Apppointment
      const res = await createAppointment(data);
      if (!res || !res.data) {
        toast.error("Appointment creation failed.");
        return;
      }
      console.log('Appointment Response:', res);


      // Create a sale 
      const salesData = {
        appointmentId: res.data?.id ?? "",
        doctorId: doctor.id,
        doctorName: doctor.name,
        patientId: patient?.id ?? "",
        patientName: patient?.name ?? "",
        totalAmount: res.data?.charge ?? 0,
      }
      const sale = await createSale(salesData);
      console.log("createSale result:", sale);  // Log the result

      const appo = res.data;

      setLoading(false);
      toast.success("Appointment Created Successfully");
      router.push("/dashboard/user/appointments");

      console.log("Here  result of Appointment - and -  Sale:", appo, sale);

    } catch (error) {
      setLoading(false);
      toast.error("Failed to create appointment");
      console.log(error);
    }

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
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <RadioInput
                    title="Gender"
                    register={register}
                    name="gender"
                    errors={errors}
                    className="col-span-1"
                    radioOptions={genderOptions}
                  />
                  <DatePickerInput
                    date={dob}
                    setDate={setDob}
                    title="Date of Birth"
                    className="col-span-1"
                  />
                </div>
                <div className="mt-8 flex justify-between gap-4 items-center">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setStep((currStep) => currStep - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep((currStep) => currStep + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 ">
                  <TextInput
                    label="Your Location"
                    register={register}
                    name="location"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter your Location"
                  />
                  <TextInput
                    label="Occupation"
                    register={register}
                    name="occupation"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter your Occupation"
                  />
                </div>
                <TextAreaInput
                  label="Reason for Seeing the Doctor"
                  register={register}
                  name="appointmentReason"
                  errors={errors}
                  placeholder="Enter appointment Reason"
                />

                <MultipleFileUpload
                  label="Medical Documents"
                  files={medicalDocs}
                  setFiles={setMedicalDocs}
                  endpoint="patientMedicalFiles"
                />
                <div className="mt-8 flex justify-between gap-4 items-center">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setStep((currStep) => currStep - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep((currStep) => currStep + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="">
                {paymentSuccess ?
                  (
                    <div className="mt-8 flex justify-between mx-auto  gap-4 items-center">

                      <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center shadow border space-y-4 p-8">
                        <div className="w-32 h-32 flex item-center justify-center rounded-full bg-lime-200">
                          <Check className="w-20 h-20 text-green-500" />
                        </div>
                        <h2 className="text-xl  font-bold text-center text-lime-700">
                          Payment Successful
                        </h2>
                      </div>

                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={() => setStep((currStep) => currStep - 1)}
                      >
                        Previous
                      </Button>
                      {loading ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving please wait ...
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                        >
                          <CalendarDays className="w-5 h-5 mr-2" />
                          Complete Appointment
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="max-w-3xl mx-auto p-8">
                      <h2 className="py-4">
                        Total Amount :{" "} ETB{doctor.doctorProfile?.hourlyWage.toLocaleString()}
                      </h2>
                      {isClient && (
                        <div>
                          <Button
                            type="button"
                            variant={"outline"}
                            onClick={() => {
                              initializePayment({ onSuccess, onClose })
                            }}
                            className="w-full bg-[#00C3F7] hover:bg-[#00A1D1] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 mr-2" />
                            <span>Make Payment With Paystack  (ETB)</span>
                            <Image src="/paystack.jpg" alt="paystack logo" width={200} height={50} className="w-auto h-4 ml-3" />
                          </Button>
                          <Button
                            type="button"
                            variant={"outline"}
                            onClick={handleChapa}
                            className="w-full bg-[#29e91f] hover:bg-[#2ff725] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 mr-2" />
                            <span>Make Payment With Chapa  (ETB)</span>
                            <Image src="/chapa.jpg" alt="Chapa logo" width={200} height={50} style={{
                              paddingLeft: "15px",
                              paddingTop: "5px"
                            }} className="w-auto h-6 ml-3" />
                          </Button>
                          <div id="chapa-inline-form"></div>


                        </div>
                      )}
                    </div>
                  )}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}