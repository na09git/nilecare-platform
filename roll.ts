// // Array of services
// const services = [
//   {
//     title: 'Telehealth',
//     slug: 'telehealth',
//     imageUrl: 'url_to_telehealth_image',
//   },
//   {
//     title: 'Video prescription refill',
//     slug: 'video-prescription-refill',
//     imageUrl: 'url_to_video_prescription_refill_image',
//   },
//   {
//     title: 'In-person doctor visit',
//     slug: 'in-person-doctor-visit',
//     imageUrl: 'url_to_in_person_doctor_visit_image',
//   },
//   {
//     title: 'UTI consult',
//     slug: 'uti-consult',
//     imageUrl: 'url_to_uti_consult_image',
//   },
//   {
//     title: 'ED consult',
//     slug: 'ed-consult',
//     imageUrl: 'url_to_ed_consult_image',
//   },
//   {
//     title: 'Mental health consult',
//     slug: 'mental-health-consult',
//     imageUrl: 'url_to_mental_health_consult_image',
//   },
// ];

// // Function to create services in the database
// const createServices = async () => {
//   for (const service of services) {
//     try {
//       // Create service in the database
//       await prisma.service.create({
//         data: {
//           title: service.title,
//           slug: service.slug,
//           imageUrl: service.imageUrl,
//         },
//       });
//       console.log(`Service "${service.title}" created successfully.`);
//     } catch (error) {
//       console.error(`Error creating service "${service.title}":`, error);
//     }
//   }
// };
///////////////////////////////////////////////////

// // Array of specialties
// const specialties = [
//   {
//     title: 'Primary care',
//     slug: 'primary-care',
//   },
//   {
//     title: 'Dermatology',
//     slug: 'dermatology',
//   },
//   {
//     title: 'Pediatrics',
//     slug: 'pediatrics',
//   },
//   {
//     title: 'Men’s health',
//     slug: 'mens-health',
//   },
//   {
//     title: 'Women’s health',
//     slug: 'womens-health',
//   },
//   {
//     title: 'Dental',
//     slug: 'dental',
//   },
// ];

// // Function to create specialties in the database
// const createSpecialties = async () => {
//   for (const specialty of specialties) {
//     try {
//       // Create specialty in the database
//       await prisma.speciality.create({
//         data: {
//           title: specialty.title,
//           slug: specialty.slug,
//         },
//       });
//       console.log(`Specialty "${specialty.title}" created successfully.`);
//     } catch (error) {
//       console.error(`Error creating specialty "${specialty.title}":`, error);
//     }
//   }
// };

// // Array of symptoms
// const symptoms = [
//   {
//     title: 'Anxiety',
//     slug: 'anxiety',
//   },
//   {
//     title: 'Depression',
//     slug: 'depression',
//   },
//   {
//     title: 'Asthma',
//     slug: 'asthma',
//   },
//   {
//     title: 'Erectile Dysfunction',
//     slug: 'erectile-dysfunction',
//   },
//   {
//     title: 'Back pain',
//     slug: 'back-pain',
//   },
//   {
//     title: 'UTI',
//     slug: 'uti',
//   },
//   {
//     title: 'Flu, cough, or cold',
//     slug: 'flu-cough-cold',
//   },
//   {
//     title: 'Acne',
//     slug: 'acne',
//   },
//   {
//     title: 'Tooth pain',
//     slug: 'tooth-pain',
//   },
//   {
//     title: 'Vaginal itching',
//     slug: 'vaginal-itching',
//   },
//   {
//     title: 'Itchy skin',
//     slug: 'itchy-skin',
//   },
//   {
//     title: 'Ear infection',
//     slug: 'ear-infection',
//   },
//   {
//     title: 'Sore throat',
//     slug: 'sore-throat',
//   },
//   {
//     title: 'Rash',
//     slug: 'rash',
//   },
//   {
//     title: 'Migraine',
//     slug: 'migraine',
//   },
//   {
//     title: 'Diarrhea',
//     slug: 'diarrhea',
//   },
//   {
//     title: 'Eczema',
//     slug: 'eczema',
//   },
//   {
//     title: 'Dizziness',
//     slug: 'dizziness',
//   },
//   {
//     title: 'Fever',
//     slug: 'fever',
//   },
// ];

// // Function to create symptoms in the database
// const createSymptoms = async () => {
//   for (const symptom of symptoms) {
//     try {
//       // Create symptom in the database
//       await prisma.symptom.create({
//         data: {
//           title: symptom.title,
//           slug: symptom.slug,
//         },
//       });
//       console.log(`Symptom "${symptom.title}" created successfully.`);
//     } catch (error) {
//       console.error(`Error creating symptom "${symptom.title}":`, error);
//     }
//   }
// };
