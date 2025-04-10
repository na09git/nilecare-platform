import Sales from '@/components/Dashboard/Doctor/Sales'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDoctorSales } from "@/actions/sales";

export default async function page() {
    const session = await getServerSession(authOptions);
    const id = session?.user.id;
    const doctorSales = await getDoctorSales(id);
    return (

        <div className='py-8 max-w-5xl w-full mx-auto'>
            {doctorSales && doctorSales.length > 0 ?
                (
                    <Sales role="DOCTOR" data={doctorSales} title='Appointment Sales' />
                ) :
                (
                    <div>
                        <p> No Sales Found  </p>
                    </div>
                )
            }
        </div>
    )
}
