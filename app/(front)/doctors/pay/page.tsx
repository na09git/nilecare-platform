import HandlePayments from '@/components/payments/HandlePayments';
import React from 'react';

export default function Page() {
    const config = {
        reference: (new Date()).getTime().toString(),
        email: "khalid@example.com",
        amount: 20000, // Amount is in the country's currency (e.g., Birr)
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        currency: "GHS",
    };

    // Define the chapaConfig
    const chapaConfig = {
        reference: (new Date()).getTime().toString(),
        email: "khalid@example.com",
        amount: 20000, // Amount in the country's currency (e.g., Birr)
        currency: "ETB",
        // firstName: "John",
        // lastName: "Doe",
        publicKey: process.env.NEXT_PUBLIC_CHAPA_PUBLIC_KEY || "",
        // callbackUrl: "https://your-callback-url.com",
    };

    return (
        <div>
            <HandlePayments transactionConfig={config} chapaConfig={chapaConfig} />
        </div>
    );
}
