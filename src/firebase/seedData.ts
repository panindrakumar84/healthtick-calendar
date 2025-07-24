// import {collection, addDoc} from "firebase/firestore"
// import {clientsData, followupBookings, onboardingBookings} from "../constants/index"
// import {db} from "../services/firebase"

// async function seedClients() {
//     const clientsCol = collection(db, "clients");
//     for (const client of clientsData) {
//         try {
//             const docRef = await addDoc(clientsCol, client);
//             console.log(`Added client with Id: ${docRef.id} `);

//         } catch (error) {
//             console.error("Error adding clients:", error)
//         }
//     }
// }

// seedClients().catch(console.error);


// async function seedBookings() {

//     try {

         // Insert all onboarding bookings
//         for (const booking of onboardingBookings) {
//           await addDoc(collection(db, 'bookings'), booking);
//           console.log(`Added onboarding for client ${booking.clientId} on ${booking.date}`);
//         }

         // Insert all follow-up bookings
//         for (const booking of followupBookings) {
//           await addDoc(collection(db, 'bookings'), booking);
//           console.log(`Added recurring follow-up for client ${booking.clientId}, starts ${booking.startTime}, repeats every ${booking.recurrence.day}`);
//         }

//         console.log('Booking seed complete!');

//     } catch (error) {
//         console.error("Error adding clients:", error)
//     }

// }

// seedBookings().catch(console.error);
