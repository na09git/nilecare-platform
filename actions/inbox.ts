"use server";

import { prismaClient } from "@/lib/db";
import { InboxProps, ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createInboxMessage(data: InboxProps) {
  try {
    const newMessage = await prismaClient.inbox.create({
      data,
    });
    revalidatePath("/dashboard/doctor/inbox");
    console.log(newMessage);
    return {
      data: newMessage,
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

export async function getInboxMessages(receiverId: string) {
  try {
    const messages = await prismaClient.inbox.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        recieverId: receiverId,
      },
    });
    return {
      data: messages,
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
export async function getInboxSentMessages(senderId: string) {
  try {
    const messages = await prismaClient.inbox.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        senderId,
      },
    });
    return {
      data: messages,
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
export async function getInboxMessageById(id: string) {
  try {
    const message = await prismaClient.inbox.findUnique({
      where: {
        id,
      },
    });
    return message;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteMessage(id: string) {
  try {
    await prismaClient.inbox.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/doctor/inbox");
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
