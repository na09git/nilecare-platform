"use server";

import EmailTemplate from "@/components/Emails/email-template";
import { prismaClient } from "@/lib/db";
import { DoctorDetail, RegisterInputProps } from "@/types/types";
import generateSlug from "@/utils/generateSlug";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { createAvailability, createDoctorProfile } from "./onboarding";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { isEmailBlacklisted } from "@/lib/isEmailBlackListed";
export async function createUser(formData: RegisterInputProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { fullName, email, role, phone, password, plan } = formData;
  try {
    if (isEmailBlacklisted(email)) {
      return {
        error: `Please use a valid, non-temporary email address.`,
        status: 409,
        data: null,
      };
    }
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        data: null,
        error: `User with this email ( ${email})  already exists in the Database`,
        status: 409,
      };
    }
    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //Generate Token
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();
    const newUser = await prismaClient.user.create({
      data: {
        name: fullName,
        slug: generateSlug(fullName),
        email,
        phone,
        password: hashedPassword,
        role,
        plan,
        token: userToken,
      },
    });

    // Create Doctor Profile only if role is DOCTOR
    if (role === "DOCTOR") {
      const profileData = {
        firstName: newUser.name.split(" ")[0] ?? "",
        lastName: newUser.name.split(" ")[1] ?? "",
        trackingNumber: generateTrackingNumber(),
        userId: newUser.id,
        phone: newUser.phone,
        email: newUser.email,
      };
      const profile = await createDoctorProfile(profileData);
      const times = [
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
      ];
      const availabilityData = {
        monday: times,
        tuesday: times,
        wednesday: times,
        thursday: times,
        friday: times,
        saturday: times,
        doctorProfileId: profile.data?.id,
      };
      await createAvailability(availabilityData);

    }
    //Send an Email with the Token on the link as a search param
    const token = newUser.token;
    const userId = newUser.id;
    const firstName = newUser.name.split(" ")[0];
    const linkText = "Verify your Account ";
    const message =
      "Thank you for registering with Online Doctors. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
    const sendMail = await resend.emails.send({
      from: "NileCare Doctors Consultation Platform  <info@care.niletech.co>",
      to: email,
      subject: "Verify Your Email Address",
      react: EmailTemplate({ firstName, token, linkText, message }),
    });
    console.log(token);
    console.log(sendMail);
    console.log(newUser);
    return {
      data: newUser,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function getUserById(id: string) {
  if (id) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
export async function updateUserById(id: string) {
  if (id) {
    try {
      const updatedUser = await prismaClient.user.update({
        where: {
          id,
        },
        data: {
          isVerfied: true,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }
}

// export async function getDoctors() {
//   try {
//     const doctors = await prismaClient.user.findMany({
//       where: {
//         role: "DOCTOR",
//       },
//       include: {
//         doctorProfile: true,
//       },
//     });
//     return doctors;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
export async function getDoctors() {
  try {
    const doctors = await prismaClient.user.findMany({
      where: {
        role: "DOCTOR", // Fetch users with role DOCTOR
      },
      select: {
        id: true,
        name: true,
        email: true,
        slug: true,
        phone: true,
        doctorProfile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            bio: true,
            profilePicture: true,
            operationMode: true,
            hourlyWage: true,
            status: true,
            dob: true,
            middleName: true,
            // Add other specific fields you need from the DoctorProfile
            availability: {
              select: {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
              },
            },
          },
        },
      },
    });

    return doctors;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getDoctorBySlug(slug: string) {
  if (slug) {
    try {
      const doctor = await prismaClient.user.findFirst({
        where: {
          role: "DOCTOR",
          slug,
        },
        select: {
          id: true,
          name: true,
          email: true,
          slug: true,
          phone: true,
          doctorProfile: {
            select: {
              firstName: true,
              lastName: true,
              gender: true,
              bio: true,
              profilePicture: true,
              operationMode: true,
              hourlyWage: true,
              yearsOfExperience: true,
              country: true,
              city: true,
              state: true,
              primarySpecialization: true,
              otherSpecialties: true,
              hospitalName: true,
              hospitalAddress: true,
              hospitalContactNumber: true,
              hospitalEmailAddress: true,
              hospitalWebsite: true,
              hospitalHoursOfOperation: true,
              servicesOffered: true,
              insuranceAccepted: true,
              educationHistory: true,
              research: true,
              accomplishments: true,
              // Add other specific fields you need from the DoctorProfile
              availability: {
                select: {
                  monday: true,
                  tuesday: true,
                  wednesday: true,
                  thursday: true,
                  friday: true,
                  saturday: true,
                  sunday: true,
                },
              },
            },
          },
        },
      });
      if (!doctor) {
        return null;
      }
      return doctor as DoctorDetail;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getDoctorById(id: string) {
  if (id) {
    try {
      const doctor = await prismaClient.user.findFirst({
        where: {
          role: "DOCTOR",
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          slug: true,
          phone: true,
          doctorProfile: {
            select: {
              firstName: true,
              lastName: true,
              gender: true,
              bio: true,
              profilePicture: true,
              operationMode: true,
              hourlyWage: true,
              yearsOfExperience: true,
              country: true,
              city: true,
              state: true,
              primarySpecialization: true,
              otherSpecialties: true,
              hospitalName: true,
              hospitalAddress: true,
              hospitalContactNumber: true,
              hospitalEmailAddress: true,
              hospitalWebsite: true,
              hospitalHoursOfOperation: true,
              servicesOffered: true,
              insuranceAccepted: true,
              educationHistory: true,
              research: true,
              accomplishments: true,
              // Add other specific fields you need from the DoctorProfile
              availability: {
                select: {
                  monday: true,
                  tuesday: true,
                  wednesday: true,
                  thursday: true,
                  friday: true,
                  saturday: true,
                  sunday: true,
                },
              },
            },
          },
        },
      });
      if (!doctor) {
        return null;
      }
      return doctor as DoctorDetail;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getDoctorProfile(id: string) {
  if (id) {
    try {
      const profile = await prismaClient.doctorProfile.findUnique({
        where: {
          userId: id,
        },
        include: {
          availability: true,
        },
      });
      return profile;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
