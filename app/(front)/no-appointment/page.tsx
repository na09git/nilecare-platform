"use client";
import { useRouter } from 'next/navigation';

const NoAppointmentData = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">No Appointment Data Found</h1>
      <p className="text-gray-600 mb-4">
        It seems you have not booked an appointment yet. Please book an
        appointment to continue.
      </p>
      <button
        onClick={handleGoBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Book an Appointment
      </button>
    </div>
  );
};

export default NoAppointmentData;
