import Sales from '@/components/Dashboard/Doctor/Sales';
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSales } from "@/actions/sales";

export default async function page() {

    const doctorSales = await getSales();
    return (

        <div className='py-8 max-w-5xl w-full mx-auto'>
            {doctorSales && doctorSales.length > 0 ?
                (
                    <Sales role="ADMIN" data={doctorSales} title='Doctors Appointment Sales' />
                ) :
                (
                    <div>
                        <p> No Sales Yet  </p>
                    </div>
                )
            }
        </div>
    )
}
