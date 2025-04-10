https://demo.alloy.health/appointments

## Step 1: Basic Information

**Doctor Information:**
-First Name
-Last Name
-Middle Name (Optional)
-Date of Birth
-Gender
-Professional Photo Upload: Allow doctors to upload a professional profile picture.
-Bio (Optional): Provide a text field for doctors to write a brief bio introducing themselves and their practice philosophy.
-Medical License Number (Required for practicing medicine)
-Medical License Expiry Date
-Years of Experience
**Contact Information:**
-Email Address (Primary contact)
-Phone Number (Optional)
**Location:**
-Country
-City
-State/Province (Optional)
-Languages Spoken

## Step 2: Credentials and Specialization

**Education:**
-Medical School Name
-Graduation Year
-Residency Information (Optional)
-Fellowship Information (Optional)
-Specialization:
-Select primary specialization(s) from a pre-defined list (e.g., Internal Medicine, Pediatrics, Cardiology)
-Option to specify additional sub-specialties (if applicable)
-Board Certifications:
-Upload copies of board certifications (e.g., Internal Medicine Board)

## Step 3: Practice Details and Availability

**Practice Information:**
-Clinic/Hospital Name
-Clinic/Hospital Address
-Clinic/Hospital Contact Number
-Clinic/Hospital Email Address
-Clinic/Hospital Website (if applicable)
-Clinic/Hospital Hours of Operation
-Services Offered
-Insurance Accepted
-Languages Spoken at the Clinic/Hospital
**Availability:**
-Set your preferred days and times for appointments (consider using a calendar interface for ease of selection)
-Indicate availability for online consultations (telehealth) if applicable
Insurance:
-Select which insurance providers you accept (from a pre-defined list)

## Step4:Additional Information:

-Education History
-Published Works or Research
-Any Special Accomplishments or Awards
-Malpractice Insurance Information (if applicable)
-Any Additional Documents (CV, Medical Certifications, etc.) Upload

Welcome Section:
Title: Welcome to [Medical App Name]
Subtitle: Your Convenient Way to Connect with Patients
Paragraph: Welcome to [Medical App Name], where connecting with patients is made easier than ever before. Our platform streamlines the process of managing appointments, providing care remotely, and keeping track of patient records. Join us in revolutionizing the way you interact with your patients and providing top-notch healthcare services.
Onboarding Section:
Title: Get Started with [Medical App Name]
Subtitle: Seamless Onboarding Process
Start New Application:
Title: Begin Your Journey
Subtitle: Start a new application to join our network of healthcare providers.
Resume Application:
Title: Continue Your Application
Subtitle: Pick up where you left off and complete your onboarding process.
Schedule for Physical Approval:
Title: Schedule a Visit
Subtitle: Arrange a time for physical approval to finalize your application.
Check Status:
Title: Track Your Progress
Subtitle: Monitor the status of your application and approvals in real-time.
Pricing Section:
Basic Plan:

Title: Essentials
Short Description: Ideal for individual practitioners starting out.
Price Per Month: $29.99
Features:
Manage up to 50 appointments per month
Basic patient record management
Email notifications for appointments
Standard Plan:

Title: Professional
Short Description: Perfect for small to medium-sized clinics.
Price Per Month: $59.99
Features:
Unlimited appointments
Advanced patient record management
SMS reminders for appointments
Customizable clinic profile
Premium Plan:

Title: Enterprise
Short Description: Tailored for large healthcare institutions and hospitals.
Price Per Month: $99.99
Features:
All features from the Standard Plan
Multi-provider support
Priority customer support
Integration with electronic health records (EHR) systems

Navbar Navigation Links for Frontend Pages:
Home
Find Doctors
Services
Telehealth Visits
In-person Visits
About Us
Contact Us
Sign In / Sign Up (for users to log in or create an account)
User Profile

Different Sections for Better User Experience:

Hero Section: Capture attention with a compelling banner showcasing the platform's value proposition.
Search Bar: Make doctor discovery quick and easy with a prominent search bar.
Featured Doctors: Highlight popular or highly-rated doctors to spark user interest.
Specialty Categories: Present specialties in a visually appealing and organized manner.
How It Works Section

Benefits Section: Clearly articulate the advantages of using your platform (convenience, wider medical access, etc.).
Testimonials Section: Display positive feedback from satisfied users to build trust.
FAQ Section: Address common user questions to reduce support interactions.
Blog Section: Provide informative and relevant medical content to establish your platform as a reliable resource.

Frontend Pages:
Home Page
Doctors Page
Services Page
About Us Page
Contact Us Page
User Profile Page
Doctor Profile Page
Appointment Booking Page
Checkout Page
Sidebar Links for Different User Dashboards:
Normal User Dashboard:
My Appointments
My Profile
Search for Doctors
Book Appointment
Telehealth Visits History
In-person Visits History
Doctor Dashboard:
My Appointments
Appointment Requests
My Profile
Schedule Availability
Telehealth Visits History
In-person Visits History
Admin Dashboard:
Manage Users
Manage Doctors
Manage Appointments
Manage Services
Manage Payments
System Settings
Different Forms Needed for CRUD Operations:
User Registration Form
User Login Form
Doctor Profile Update Form
Appointment Booking Form
Appointment Update Form
Service Creation/Update Form
User Management Form
Doctor Management Form
Appointment Management Form
Payment Management Form
System Settings Form

// OnBoardingContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";

interface IOnBoardingContextData {
// Initial form data
bioData: BioDataFormProps;
profileData: ProfileFormProps;
contactData: ContactFormProps;
educationData: EducationFormProps;
practiceData: PracticeFormProps;
additionalData: additionalFormProps;

// Functions to update form data
setBioData: (data: BioDataFormProps) => void;
setProfileData: (data: ProfileFormProps) => void;
setContactData: (data: ContactFormProps) => void;
setEducationData: (data: EducationFormProps) => void;
setPracticeData: (data: PracticeFormProps) => void;
setAdditionalData: (data: additionalFormProps) => void;
}

const initialBioData: BioDataFormProps = {
firstName: "",
lastName: "",
gender: "",
page: "",
trackingNumber: "",
};

const initialProfileData: ProfileFormProps = {
bio: "",
medicalLicense: "",
yearsOfExperience: 0,
page: "",
};

// Define initial data for other forms similarly

const OnBoardingContext = createContext<IOnBoardingContextData>({
bioData: initialBioData,
profileData: initialProfileData,
// Initialize other form data
setBioData: () => {},
setProfileData: () => {},
// Initialize other form data setters
});

export function OnboardingContextProvider({
children,
}: {
children: ReactNode;
}) {
const [bioData, setBioData] = useState<BioDataFormProps>(initialBioData);
const [profileData, setProfileData] = useState<ProfileFormProps>(initialProfileData);
// Initialize state for other forms similarly

const contextValues: IOnBoardingContextData = {
bioData,
profileData,
// Include other form data
setBioData,
setProfileData,
// Include other form data setters
};

return (
<OnBoardingContext.Provider value={contextValues}>
{children}
</OnBoardingContext.Provider>
);
}

export function useOnboardingContext() {
return useContext(OnBoardingContext);
}

### ZOOM INTEGRATION

https://chatgpt.com/c/6373450e-9752-4eab-bbbd-790093213649

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
if (req.method === 'POST') {
const { userIds } = req.body;

    // Remove duplicates from userIds array
    const uniqueUserIds = [...new Set(userIds)];

    try {
      // Fetch user details from the database
      const users = await prisma.user.findMany({
        where: {
          id: { in: uniqueUserIds },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user details' });
    } finally {
      await prisma.$disconnect();
    }

} else {
res.status(405).json({ error: 'Method not allowed' });
}
}
