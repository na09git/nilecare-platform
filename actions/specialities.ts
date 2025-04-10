"use server";

import { SpecialtyProps } from "@/components/Dashboard/SpecialtyForm";
import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createSpecialty(data: SpecialtyProps) {
  try {
    const existingSpecialty = await prismaClient.speciality.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingSpecialty) {
      return {
        data: null,
        status: 409,
        error: "Specialty already existing",
      };
    }
    const newSpecialty = await prismaClient.speciality.create({
      data,
    });
    revalidatePath("/dashboard/specialties");
    console.log(newSpecialty);
    return {
      data: newSpecialty,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function updateSpecialty(id: string, data: SpecialtyProps) {
  try {
    const existingSpecialty = await prismaClient.speciality.findUnique({
      where: {
        id,
      },
    });
    if (!existingSpecialty) {
      return {
        data: null,
        status: 404,
        error: "Specialty does not exist",
      };
    }
    const updatedSpecialty = await prismaClient.speciality.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/specialties");
    console.log(updatedSpecialty);
    return {
      data: updatedSpecialty,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function createManySpecialties() {
  try {
    const specialties = [
      {
        title: "Primary care",
        slug: "primary-care",
      },
      {
        title: "Dermatology",
        slug: "dermatology",
      },
      {
        title: "Pediatrics",
        slug: "pediatrics",
      },
      {
        title: "Men’s health",
        slug: "mens-health",
      },
      {
        title: "Women’s health",
        slug: "womens-health",
      },
      {
        title: "Dental",
        slug: "dental",
      },
    ];
    for (const specialty of specialties) {
      try {
        await createSpecialty(specialty);
      } catch (error) {
        console.error(`Error creating service "${specialty.title}":`, error);
      }
    }
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getSpecialties() {
  try {
    const specialties = await prismaClient.speciality.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: specialties,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getSpecialtyBySlug(slug: string) {
  try {
    const specialty = await prismaClient.speciality.findUnique({
      where: {
        slug,
      },
    });
    return {
      data: specialty,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function deleteSpecialty(id: string) {
  try {
    await prismaClient.speciality.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/specialties");
    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
