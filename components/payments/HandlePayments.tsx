'use client';
import { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { Button } from '@/components/ui/button';

interface ConfigProps {
    reference: string;
    email: string;
    amount: number;
    publicKey: string;
    currency: string;
}

const HandlePayments = ({ transactionConfig, chapaConfig }: { transactionConfig: ConfigProps, chapaConfig: any }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Paystack Payment Handlers
    const onSuccess = (reference: any) => {
        console.log('Payment Successful: ', reference);
    };

    const onClose = () => {
        console.log('Paystack Payment Closed');
    };

    const initializePayment = usePaystackPayment(transactionConfig);

    // ✅ Function to handle Chapa payment
    const handleChapaPayment = async () => {
        try {
            const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${chapaConfig.publicKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: chapaConfig.amount,
                    currency: chapaConfig.currency,
                    email: chapaConfig.email,
                    first_name: chapaConfig.firstName,
                    last_name: chapaConfig.lastName,
                    tx_ref: chapaConfig.reference,
                    callback_url: chapaConfig.callbackUrl,
                }),
            });

            const data = await response.json();
            if (data.status === 'success') {
                window.location.href = data.data.checkout_url;
            } else {
                console.error('Chapa Payment Error: ', data);
            }
        } catch (error) {
            console.error('Chapa payment error:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            {isClient && (
                <div>
                    {/* ✅ Paystack Payment Button */}
                    <Button onClick={() => {
                        initializePayment({ onSuccess, onClose })
                    }}>
                        Pay with Paystack (GHS)
                    </Button>

                    {/* ✅ Chapa Payment Button */}
                    <Button onClick={handleChapaPayment} className="ml-4">
                        Pay with Chapa (ETB)
                    </Button>
                </div>
            )}
        </div>
    );
};

export default HandlePayments;
