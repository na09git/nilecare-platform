// pages/api/verifychapa.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const tx_ref = searchParams.get('tx_ref');
    const status = searchParams.get('status');

    try {
        // Replace with your actual Chapa verification endpoint
        const verificationUrl = `https://api.chapa.co/v1/transaction/verify/${tx_ref}`;

        const response = await axios.get(verificationUrl, {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
            },
        });

        const data = response.data;
        console.log('Chapa Verification Data:', data);

        if (data.status === 'success') {
            // Return a JSON response indicating payment success
            return NextResponse.json({ success: true });
        } else {
            // Payment failed
            return NextResponse.json({ success: false });
        }

    } catch (error: any) {
        console.error('Chapa Verification Error:', error);
        // Handle the error appropriately
        return NextResponse.redirect(new URL('/dashboard/user/appointments?payment=error', req.url)); // Redirect to error page
    }
}
