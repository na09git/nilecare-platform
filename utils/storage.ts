export const removeAppointmentData = () => {
    console.log("Before removal:", localStorage.getItem("appointmentData"));
    localStorage.removeItem("appointmentData");
    console.log("After removal:", localStorage.getItem("appointmentData"));
};
