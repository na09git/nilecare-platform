"use server";

import WelcomeEmail from "@/components/Emails/welcome-email";
import { prismaClient } from "@/lib/db";
import { Resend } from "resend";
export async function createDoctorProfile(formData: any) {
  const {
    dob,
    firstName,
    gender,
    lastName,
    middleName,
    page,
    trackingNumber,
    userId,
    phone,
    email,
  } = formData;
  try {
    const newProfile = await prismaClient.doctorProfile.create({
      data: {
        dob,
        firstName,
        gender,
        lastName,
        middleName,
        page,
        trackingNumber,
        userId,
        phone,
        email,
      },
    });
    console.log(newProfile);
    return {
      data: newProfile,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong",
    };
  }
}
export async function createAvailability(data: any) {
  try {
    const newAvail = await prismaClient.availability.create({
      data,
    });
    console.log(newAvail);
    return newAvail;
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong",
    };
  }
}

export async function updateDoctorProfile(id: string | undefined, data: any) {
  if (id) {
    try {
      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedProfile);
      return {
        data: updatedProfile,
        status: 201,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Profile was not updated",
      };
    }
  }
}
export async function updateAvailabilityById(
  id: string | undefined,
  data: any
) {
  if (id) {
    try {
      const updatedAva = await prismaClient.availability.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedAva);
      return {
        data: updatedAva,
        status: 201,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Availability was not updated",
      };
    }
  }
}

export async function getApplicationByTrack(trackingNumber: string) {
  if (trackingNumber) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
        where: {
          trackingNumber,
        },
      });
      if (!existingProfile) {
        return {
          data: null,
          status: 404,
          error: "Wrong Tracking Number",
        };
      }
      return {
        data: existingProfile,
        status: 200,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Something Went wrong",
      };
    }
  }
}

export async function completeProfile(id: string | undefined, data: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (id) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
        where: {
          id,
        },
      });
      if (!existingProfile) {
        return {
          data: null,
          status: 404,
          error: "Profile Not Found",
        };
      }

      //send a welcome email
      const firstName = existingProfile.firstName;
      const email = existingProfile.email as string;
      const previewText = "Welcome to NileCare Online Doctors Appointment App ";
      const message =
        "Thank you for joining NileCare Online Doctors Appointment App, we are so grateful that we have onboard ";
      const sendMail = await resend.emails.send({
        from: "NileCare Doctors Consultation Platform <info@care.niletech.co>",
        to: email,
        subject: "Welcome to NileCare Online Doctors Appointment App",
        react: WelcomeEmail({ firstName, previewText, message }),
      });
      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedProfile);
      return {
        data: updatedProfile,
        status: 201,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Profile was not updated",
      };
    }
  }
}
export async function getDoctorProfileById(userId: string | undefined) {
  if (userId) {
    try {
      const profile = await prismaClient.doctorProfile.findUnique({
        where: {
          userId,
        },
        include: {
          availability: true,
        },
      });
      // console.log(profile);
      return {
        data: profile,
        status: 200,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Profile was not fetched",
      };
    }
  }
}
