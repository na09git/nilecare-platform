"use server"

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";


export interface SaleProps {
    appointmentId: string;
    doctorId: string;
    doctorName: string;
    patientId: string;
    patientName: string;
    totalAmount: number;
}
export async function createSale(data: SaleProps) {
    try {
        const sale = await prismaClient.sale.create({
            data,
        })
        revalidatePath("/dashboard/doctor/sales");
        return sale;
    } catch (error) {
        console.log(error);
    }
}


export async function getSales() {
    try {
        const sales = await prismaClient.sale.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return sales;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export async function getDoctorSales(doctorId: string | undefined) {
    if (doctorId) {
        try {
            const sales = await prismaClient.sale.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                where: {
                    doctorId
                },
            });
            return sales;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}