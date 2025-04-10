"use server";

import { SpecialtyProps } from "@/components/Dashboard/SpecialtyForm";
import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createSymptom(data: SpecialtyProps) {
  try {
    const existingSymptom = await prismaClient.symptom.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingSymptom) {
      return {
        data: null,
        status: 409,
        error: "Symptom already existing",
      };
    }
    const newSymptom = await prismaClient.symptom.create({
      data,
    });
    revalidatePath("/dashboard/symptoms");
    console.log(newSymptom);
    return {
      data: newSymptom,
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
export async function updateSymptomById(id: string, data: SpecialtyProps) {
  try {
    const existingSymptom = await prismaClient.symptom.findUnique({
      where: {
        id,
      },
    });
    if (!existingSymptom) {
      return {
        data: null,
        status: 404,
        error: "Symptom does not exist",
      };
    }
    const updatedSymptom = await prismaClient.symptom.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/symptoms");
    console.log(updatedSymptom);
    return {
      data: updatedSymptom,
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
export async function createManySymptoms() {
  try {
    const symptoms = [
      {
        title: "Anxiety",
        slug: "anxiety",
      },
      {
        title: "Depression",
        slug: "depression",
      },
      {
        title: "Asthma",
        slug: "asthma",
      },
      {
        title: "Erectile Dysfunction",
        slug: "erectile-dysfunction",
      },
      {
        title: "Back pain",
        slug: "back-pain",
      },
      {
        title: "UTI",
        slug: "uti",
      },
      {
        title: "Flu, cough, or cold",
        slug: "flu-cough-cold",
      },
      {
        title: "Acne",
        slug: "acne",
      },
      {
        title: "Tooth pain",
        slug: "tooth-pain",
      },
      {
        title: "Vaginal itching",
        slug: "vaginal-itching",
      },
      {
        title: "Itchy skin",
        slug: "itchy-skin",
      },
      {
        title: "Ear infection",
        slug: "ear-infection",
      },
      {
        title: "Sore throat",
        slug: "sore-throat",
      },
      {
        title: "Rash",
        slug: "rash",
      },
      {
        title: "Migraine",
        slug: "migraine",
      },
      {
        title: "Diarrhea",
        slug: "diarrhea",
      },
      {
        title: "Eczema",
        slug: "eczema",
      },
      {
        title: "Dizziness",
        slug: "dizziness",
      },
      {
        title: "Fever",
        slug: "fever",
      },
    ];
    for (const symptom of symptoms) {
      try {
        await createSymptom(symptom);
      } catch (error) {
        console.error(`Error creating symptom "${symptom.title}":`, error);
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
export async function getSymptoms() {
  try {
    const symptoms = await prismaClient.symptom.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: symptoms,
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
export async function getSymptomBySlug(slug: string) {
  try {
    const symptom = await prismaClient.symptom.findUnique({
      where: {
        slug,
      },
    });
    return {
      data: symptom,
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

export async function deleteSymptom(id: string) {
  try {
    await prismaClient.symptom.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/symptoms");
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
