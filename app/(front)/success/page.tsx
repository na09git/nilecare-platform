// app/(front)/success/page.tsx // This file is for the success page after payment

'use client'
import { useRouter } from 'next/navigation';
import { CheckCircle2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { removeAppointmentData } from '@/utils/storage'; // Import function

const PaymentSuccessNotification = () => {
    const router = useRouter();
    const [cleared, setCleared] = useState(false);

    // Clear data only once
    useEffect(() => {
        if (!cleared) {
            removeAppointmentData(); // Now this function is available
            setCleared(true);
        }
    }, [cleared]);

    const redirectToFirstTab = () => {
        router.push('/dashboard/user/appointments');
    };

    return (
        <div className='p-20 mt-25 mb-25'>
            <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-6 border border-green-200">
                <div className="p-6">
                    <CheckCircle2Icon className="w-16 h-16 text-green-500" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">
                        Payment Completed Successfully!
                    </h2>
                    <p className="text-gray-500 mt-2 text-center">
                        You have successfully completed your payment. Click the button below to see your Appointment.
                    </p>
                </div>
                <button
                    onClick={redirectToFirstTab}
                    className="mt-4 inline-block bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                    View Appointment
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessNotification;
