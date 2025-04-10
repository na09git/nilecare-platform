import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
    {
        name: 'User authentication and authorization.',
        description:
            'Secure and seamless login for patients and doctors, ensuring safe and authorized access to their respective dashboards.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Doctor Dashboard.',
        description: 'A dedicated dashboard for doctors to manage patient appointments, review medical records, and track patient progress.',
        icon: LockClosedIcon,
    },
    {
        name: 'Patient Dashboard.',
        description:
            'A user-friendly platform for patients to manage appointments, view medical history, track health data, and connect with healthcare professionals.',
        icon: ServerIcon,
    },
    {
        name: 'Appointment scheduling and management.',
        description:
            'Easily schedule and manage doctor appointments. View available time slots and get reminders for upcoming appointments.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Payment integration with Chapa.',
        description:
            'Seamless payment experience integrated with multiple banks like CBE, BOA, HIJRA, DASHEN, ZAMZAM, RAMMIS, AWASH, and others.',
        icon: LockClosedIcon,
    },
    {
        name: 'Support Medical document sharing.',
        description:
            'Efficient and secure Sharing of medical Documnents,  including investigation results and Others.',
        icon: ServerIcon,
    },
    {
        name: 'Meeting in Video and Voice integration.',
        description: 'Real-time video and voice consultations between patients and doctors for a personalized healthcare experience.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Messages.',
        description: 'In-app messaging system for patients and doctors to communicate securely and confidentially.',
        icon: LockClosedIcon,
    },
    {
        name: 'Direct Email from NileCare to external platforms.',
        description: 'Send and receive emails directly from the NileCare platform to communicate with external services and healthcare providers.',
        icon: ServerIcon,
    },
]

export default function Example() {
    return (
        <div className="relative isolate overflow-hidden dark:bg-slate-950 bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    aria-hidden="true"
                    className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                >
                    <defs>
                        <pattern
                            x="50%"
                            y={-1}
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width={200}
                            height={200}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
                </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base/7 font-semibold text-indigo-600 ">About NileCare</p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-gray-300">
                                Your Trusted Healthcare Partner
                            </h1>
                            <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-500">
                                NileCare is a comprehensive healthcare platform dedicated to providing accessible and reliable healthcare services. We aim to enhance the quality of care through innovative technology and expert medical professionals, ensuring you get the best healthcare experience possible.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                        alt="NileCare Healthcare Platform"
                        src="/dashboard.png"
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
                    />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg dark:text-gray-500">
                            <p>
                                At NileCare, we understand the importance of accessible and high-quality healthcare. Our mission is to offer a wide range of services that cater to your health and wellness needs. Whether you're looking for primary care, specialized treatments, or expert advice, NileCare is here to provide it all.
                            </p>
                            <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                {features.map((feature) => (
                                    <li key={feature.name} className="flex gap-x-3">
                                        <feature.icon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                                        <span>
                                            <strong className="font-semibold text-gray-900 dark:text-gray-300">{feature.name}</strong> {feature.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-8">
                                With NileCare, you can be confident that you are receiving the highest standard of care. Our services are designed to be as flexible and accessible as possible, allowing you to get the care you need when you need it most.
                            </p>
                            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue-500">Join the NileCare Community</h2>
                            <p className="mt-6">
                                Our platform is more than just healthcare; it's a community. We believe that everyone deserves access to the best possible care, and we are committed to making that a reality. Whether you're a patient seeking care or a healthcare provider looking to offer your services, NileCare is here to support you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
