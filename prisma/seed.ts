import {
  PrismaClient,
  UserRole,
  AppointmentStatus,
  DoctorStatus,
} from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function createDoctor(
  email: string,
  name: string,
  specialization: string
) {
  const doctorPassword = await hash("doctor", 10);
  const doctor = await prisma.user.create({
    data: {
      name,
      email,
      password: doctorPassword,
      role: UserRole.DOCTOR,
      phone: "5555555555",
      token: Math.floor(Math.random() * 99999999),
      slug: name.toLowerCase().replace(" ", "-"),
    },
  });

  console.log(`Doctor created: ${name}`);

  const doctorProfile = await prisma.doctorProfile.create({
    data: {
      userId: doctor.id,
      status: DoctorStatus.APPROVED,
      trackingNumber: `DOC${Math.floor(100000 + Math.random() * 900000)}`,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      gender: "Unspecified",
      page: `dr-${name.toLowerCase().replace(" ", "-")}`,
      bio: `Experienced ${specialization} with years of practice.`,
      yearsOfExperience: Math.floor(5 + Math.random() * 20),
      email: doctor.email,
      phone: doctor.phone,
      country: "United States",
      city: "New York",
      state: "NY",
      medicalSchool: "Medical University",
      graduationYear: `${2000 + Math.floor(Math.random() * 20)}`,
      primarySpecialization: specialization,
      hourlyWage: 100 + Math.floor(Math.random() * 100),
    },
  });

  console.log(`Doctor Profile created for: ${name}`);

  const availabilityHours = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`);
  const availability = await prisma.availability.create({
    data: {
      doctorProfileId: doctorProfile.id,
      monday: availabilityHours,
      tuesday: availabilityHours,
      wednesday: availabilityHours,
      thursday: availabilityHours,
      friday: availabilityHours,
      saturday: availabilityHours,
      sunday: availabilityHours,
    },
  });

  console.log(`Availability created for: ${name}`);

  return { doctor, doctorProfile, availability };
}

async function main() {
  // Create Admin
  const adminPassword = await hash("admin", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@admin.com",
      password: adminPassword,
      role: UserRole.ADMIN,
      phone: "1234567890",
      token: Math.floor(Math.random() * 989999999),
      slug: "admin-user",
    },
  });

  console.log("Admin created:", admin);

  // Create Patient
  const patientPassword = await hash("patient", 10);
  const patient = await prisma.user.create({
    data: {
      name: "Patient User",
      email: "patient@patient.com",
      password: patientPassword,
      role: UserRole.USER,
      phone: "9876543210",
      token: Math.floor(Math.random() * 999998999),
      slug: "patient-user",
    },
  });

  console.log("Patient created:", patient);

  // Create Doctors
  const doctor1 = await createDoctor(
    "doctor@doctor.com",
    "John Doe",
    "General Practice"
  );
  const doctor2 = await createDoctor(
    "jane.smith@doctor.com",
    "Jane Smith",
    "Pediatrics"
  );
  const doctor3 = await createDoctor(
    "mike.johnson@doctor.com",
    "Mike Johnson",
    "Cardiology"
  );

  // Create an Appointment (example with the first doctor)
  const appointment = await prisma.appointment.create({
    data: {
      appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      appointmentFormattedDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      doctorId: doctor1.doctor.id,
      doctorName: `${doctor1.doctorProfile.firstName} ${doctor1.doctorProfile.lastName}`,
      patientId: patient.id,
      charge: 100,
      appointmentTime: "14:00",
      firstName: patient.name.split(" ")[0],
      lastName: patient.name.split(" ")[1],
      gender: "Unspecified",
      phone: patient.phone,
      email: patient.email,
      location: "Online",
      appointmentReason: "General checkup",
      status: AppointmentStatus.pending,
    },
  });

  console.log("Appointment created:", appointment);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
