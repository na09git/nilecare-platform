//    app/api/chapa

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { amount, currency, email, first_name, last_name, phone_number, tx_ref, callback_url, return_url, customization } = await req.json();

    // Explicitly define the type of response to ensure proper inference of its properties
    let response;

    try {
        const header = {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        };

        const body = {
            amount: amount,
            currency: currency,
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            tx_ref: tx_ref,
            callback_url: callback_url,
            return_url: return_url,
            "customization[title]": customization.title,
            "customization[description]": customization.description,
        };

        console.log('Request body: ------ api/chapa', body);  // Log request body
        console.log('Request headers:  ------ api/chapa ', header); // Log request headers

        // Perform the POST request and store the response
        try {
            response = await axios.post("https://api.chapa.co/v1/transaction/initialize", body, header);
        } catch (error: any) {
            console.log(error.response?.data); // Prints the error response data
            console.log(error.response?.status); // Prints the status code of the error response
            console.log(error.response?.headers); // Prints the headers of the error response
            return NextResponse.json(
                {
                    message: error.message, // Handle error response
                },
                { status: 400 }
            );
        }

        // Now that we are sure resp is assigned, we check for its value
        if (response) {
            return NextResponse.json(response.data, { status: 200 }); // Send response back
        } else {
            return NextResponse.json({ message: "No response from the API" }, { status: 400 });
        }
    } catch (e) {
        return NextResponse.json(
            {
                error_code: 'UNKNOWN_CODE_ERROR',
                message: 'An unknown error occurred.',
            },
            { status: 400 }
        );
    }
}

