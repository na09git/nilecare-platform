"use server";

import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createService(data: ServiceProps) {
  try {
    const existingService = await prismaClient.service.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingService) {
      return {
        data: null,
        status: 409,
        error: "Service already existing",
      };
    }
    const newService = await prismaClient.service.create({
      data,
    });
    revalidatePath("/dashboard/services");
    console.log(newService);
    return {
      data: newService,
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
export async function updateService(id: string, data: ServiceProps) {
  try {
    const existingService = await prismaClient.service.findUnique({
      where: {
        id,
      },
    });
    if (!existingService) {
      return {
        data: null,
        status: 404,
        error: "Service with that doest exist",
      };
    }
    const updatedService = await prismaClient.service.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/services");
    console.log(updatedService);
    return {
      data: updatedService,
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
export async function createManyServices() {
  try {
    const services = [
      {
        title: "Telehealth",
        slug: "telehealth",
        imageUrl:
          "https://utfs.io/f/c56e827b-d6b0-47de-911f-69cc7618ebbf-v7obs8.png",
      },
      {
        title: "Video prescription refill",
        slug: "video-prescription-refill",
        imageUrl:
          "https://utfs.io/f/49ac2ff7-5c8b-490b-91ef-2995b379e5fa-mw2o8v.png",
      },
      {
        title: "In-person doctor visit",
        slug: "in-person-doctor-visit",
        imageUrl:
          "https://utfs.io/f/5a3df907-a734-45eb-b329-00e682aa084f-fkv1ob.png",
      },
      {
        title: "UTI consult",
        slug: "uti-consult",
        imageUrl:
          "https://utfs.io/f/56dfedde-e9f0-49bf-8d20-bfc3721ac7bd-1tsgvn.png",
      },
      {
        title: "ED consult",
        slug: "ed-consult",
        imageUrl:
          "https://utfs.io/f/abdefad5-4550-4547-9aa6-db6722a294cb-5g8vya.png",
      },
      {
        title: "Mental health consult",
        slug: "mental-health-consult",
        imageUrl:
          "https://utfs.io/f/55f0f1d3-148f-4880-8823-ec64d44d6d37-jpgalc.png",
      },
    ];
    for (const service of services) {
      try {
        await createService(service);
      } catch (error) {
        console.error(`Error creating service "${service.title}":`, error);
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
export interface ServiceWithDoctorProfileCount {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  _count: {
    doctorProfiles: number;
  };
}
export async function getServices() {
  try {
    const services = await prismaClient.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        _count: {
          select: {
            doctorProfiles: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return {
      data: services,
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
export async function getServiceBySlug(slug: string) {
  try {
    if (slug) {
      const service = await prismaClient.service.findUnique({
        where: {
          slug,
        },
      });
      return {
        data: service,
        status: 200,
        error: null,
      };
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
export async function deleteService(id: string) {
  try {
    await prismaClient.service.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/services");
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

export async function updateDoctorProfileWithService(
  id: string | undefined,
  data: any
) {
  if (id) {
    try {
      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedProfile);
      revalidatePath("/dashboard/doctor/settings");
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
