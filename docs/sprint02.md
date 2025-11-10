# CP317A – Sprint 02
**Group 25 – Car Rental System**

---

## Cover Page
- **Course Code:** CP317A – Software Engineering
- **Project Title:** Car Rental System
- **Group ID:** Group 25
- **Team Members:**
  - Arjun Singh
  - Connor Davison
  - Hayden Gdanski
  - Khush Patel
  - Sam Oreskovic
  - Andrew Opris

---

## 1. Sprint Goal
Deliver working user account + rental management features.

### Objectives
- Implement Cancel Reservation (UI-3)
- Implement View Rental History (UI-4)
- Implement Modify Reservation (UI-5)
- Account / Profile (UI-6) to store in mock DB (memory file store)

**Why these stories:**  
We chose these stories because Sprint 02 focuses on completing the full reservation lifecycle for a user. In Sprint 01, we worked on allowing customers to log in, search and reserve; now Sprint 02 adds the actual management functionality that allows a user to manage those reservations after creation. The emphasis was on connecting UI -> state -> interaction, rather than just isolated screens, as this is the first sprint in which state consistency across numerous pages was important. By completing Profile, Cancel, Modify, and History, we now have the groundwork for a fully operational customer experience that mimics the end to end behavior of a real rental platform. These features get us ready for Sprint 03 where we will start using persistence beyond mock memory and implement real database-level storage to store user and reservation data in between sessions.

---

## 2. Sprint Backlog

| Story ID | Story Title | Points | Priority | Assigned To | Tasks | Status |
|----------|-------------|--------|----------|-------------|-------|--------|
| UI-3 | Cancel Reservation | 3 | Medium | Sam Oreskovic | Implement remove reservation from mock DB | Completed |
| UI-4 | View Rental History | 2 | Low | Connor Davison | Show past rentals from mock DB | Completed |
| UI-5 | Modify Reservation | 5 | Medium | Khush Patel | Update reservation record in mock DB | In Progress |
| UI-6 | Account / Profile | 5 | Medium | Arjun Singh | Profile page + mock store setup completed | Completed |

---

## 3. Implementation Progress
**Sprint Integration Summary:**
During this sprint we introduced a shared global reservation state so reservation data is stored in one place instead of per-page. This allowed features like cancel, modify, and history to read/write from the same source, which means the reservation data now stays consistent no matter what page the user is on. This was the first sprint where the system started behaving like a real connected application instead of separate UI screens. The result is that booking, viewing history, and cancelling all now impact each other properly, which moves the project closer to an actual functional rental flow rather than isolated prototypes.

### Arjun Singh – UI-6 (Account/Profile)
**Overview:**  
Profile page implemented under `/src/app/profile/page.tsx`. User data loads from mock store and updates mock store on Save.

**Files Modified:**
- `/src/app/profile/page.tsx`  
- `/src/lib/mockData.ts` (created)

**Code Snippet:**  
```tsx
"use client";
import { useState } from "react";
import { mockStore } from "../../lib/mockData";

export default function ProfilePage() {
  const [name, setName] = useState(mockStore.user.name);
  const [email, setEmail] = useState(mockStore.user.email);
  const [license, setLicense] = useState(mockStore.user.license);

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mockStore.user = { name, email, license };
    alert("Profile saved (mock).");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={save} className="bg-white p-4 rounded-xl shadow space-y-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="border rounded w-full p-2" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="border rounded w-full p-2" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Driver’s License</label>
          <input className="border rounded w-full p-2" value={license} onChange={e=>setLicense(e.target.value)} />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </main>
  );
}
```

### Arjun – UI-6 Profile Page

**Test Cases:**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Editing profile info | Changed name, email, license then hit "Save" | Updated values should be stored in mockStore | Values updated | PASS |
| Save with empty name | Remove name and click save | Should require user input | Alert stops save | PASS |
| Navigation persistence | Go to search page then back to profile | Data still present | Data was still there after returning | PASS |

**Verification:** Arjun

---

### Sam Oreskovic – UI-3 (Cancel Reservation)
**Overview:**  
- Modified `reserve/page.tsx` to include a cancel button inside the temporary reservation list. Connected to `removeReservation()` for easy deletion.
- Added working Cancel buttons beside each active booking in `reservations/page.tsx`. Added web confirmation prompts to confirm each cancellation on this page.
- Altered the image paths in `data/mockCars.ts`, ensuring car images are shown on each reservation, regardless of their page.
- Verified that deleting a reservation on `/reservations` reflects on `/reserve`, and vice-versa, using context in `context/ReservationContext.tsx`.
- After adjusting the image paths, edits were needed on `search/page.tsx` to allow for the new image paths.
  

**Files Modified:**
- `/src/app/reserve/page.tsx`  (modified)
- `/src/app/reservations/page.tsx` (modified)
- `/src/app/data/mockCars` (modified)
- `/src/app/search/page.tsx` (modified)

**Code Snippet:**  
```tsx
const { reservations, addReservation, removeReservation } = useReservations();
...
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
...
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
    alert("Return date cannot be earlier than pickup date.");
    return;
  }

  const selectedCar = mockCars.find((c) => c.id.toString() === formData.carId);
  if (!selectedCar) return alert("Please select a valid car option.");

  // Add new reservation to global state
  addReservation({
    name: formData.name,
    email: formData.email,
    carId: formData.carId,
    pickupDate: formData.pickupDate,
    returnDate: formData.returnDate,
  });

  alert(`Reservation confirmed for ${selectedCar.make} ${selectedCar.model}!`);

  // Reset form
  setFormData({ name: "", email: "", carId: "", pickupDate: "", returnDate: "" });

  // Redirect to reservations page
  router.push("/reservations");
};
...
const handleCancel = (index: number) => {
  if (confirm("Cancel this reservation?")) {
    const reservationToRemove = reservations[index];
    if (reservationToRemove) {
      removeReservation(reservationToRemove.id);
    }
  }
};
...
useEffect(() => {
  if (preSelectedCarId) {
    setFormData((prev) => ({ ...prev, carId: preSelectedCarId }));
  }
}, [preSelectedCarId]);
...
{reservations.length > 0 && (
  <div className="mt-8 bg-gray-900 p-4 rounded-xl max-w-md w-full">
    <h2 className="text-2xl mb-2">Current Reservations</h2>
    {reservations.map((r, i) => {
      const car = mockCars.find(c => c.id.toString() === r.carId);
      const imagePath = car?.image ? `/cars/${car.image}` : "/DefaultCarImage.png";

      return (
        <div 
          key={i}
          className="border-t border-gray-700 py-3 text-sm flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={imagePath}
              alt={`${car?.make ?? "Car"} ${car?.model ?? ""}`}
              width={100}
              height={60}
              style={{ borderRadius: "6px", objectFit: "cover" }}
            />
            <div>
              <strong>{r.name}</strong> reserved{" "}
              <b>{car?.make} {car?.model}</b> ({car?.year})
              <br />
              from {r.pickupDate} → {r.returnDate} (${car?.pricePerDay}/day)
            </div>
          </div>

          {/* Cancel Button */}
          <button
            onClick={() => handleCancel(i)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      );
    })}
  </div>
)}

// search/page.tsx //
 <Image
   src={car.image ? `/cars/${car.image}` : "/DefaultCarImage.png"}
   alt={`${car.make ?? "Car"} ${car.model ?? ""}`}
   fill
   className="object-cover"
 />
```
  
  **Test Cases:**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Images from `public/cars/` should be present in the `Reserve` page | Add reservation | Image of selected car should be shown | Correct image is shown | PASS |
| Reservations appearing on both pages | Added reservation, switched pages | Second page should show reservation from first page | Shows reservation on both pages | PASS |
| Canceling Reservation on `/reserve` | Added reservation, pressed cancel after making it | Reservation should be removed from both pages | Reservations were removed | PASS |
| Canceling Reservation on `/reservations` | Added reservation, pressed cancel on the other page after making it | Reservation should be removed from both pages | Reservations were removed | PASS |


**Verification:** Sam


**Outcome:**
The Cancel Reservation feature is now fully implemented, functional, and is globally syncronized between pages, without the need to reload.

---

### Connor Davison – UI-4 (View Rental History)
**Overview:**  
- Reservation page implemented under `/src/app/reservations/page.tsx`
- Data from reservations is now reserved under src/appContext/reservationContext and is functional under My Reservations tab.
- User is able to see, modift and cancel current active bookings. The user is also able to see cancelled bookings (If they had any)
- All changing content is also updated under src/app/Context/reservationContext.


**Files Modified:**
- `/src/app/reservations/page.tsx`  (created)


**Code Snippet:**  
```tsx
<div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-left mb-6">My Reservations</h1>
      
      {/* Active Bookings Section */}
      <section className="mb-8">
        <h2 className="text-sm text-green-400 font-semibold text-left mb-4">Active Bookings</h2>
        


        {/* Show message if no active bookings */}
        {activeBookings.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-6 text-lg">No active bookings</p>
            <div className="flex gap-4 justify-center">
              <Link href="/search" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Search Cars
              </Link>
              <Link href="/reserve" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Reserve Car
              </Link>
            </div>
          </div>
        ) : (

          // Show bookings list
          <div className="space-y-4">
            {activeBookings.map((reservation) => {
              const car = mockCars.find(c => c.id.toString() === reservation.carId);
              if (!car) return null;
              
              return (
                <div key={reservation.id} className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">
                  <Image src={car.image} alt={`${car.make} ${car.model}`} width={100} height={60} className="rounded object-cover" />
                  <div className="flex-1">
                    <strong>{reservation.name}</strong> reserved{' '}
                    <b>{car.make} {car.model}</b> ({car.year})<br />
                    from {reservation.pickupDate} → {reservation.returnDate} (${car.pricePerDay}/day)
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Cancelled Bookings Section */}
      {cancelledBookings.length > 0 && (
        <section>
          <h2 className="text-sm text-red-400 font-semibold text-left mb-4">Cancelled Bookings</h2>
          <div className="space-y-4">
            {cancelledBookings.map((reservation) => {
              const car = mockCars.find(c => c.id.toString() === reservation.carId);
              if (!car) return null;
              
              return (
                <div key={reservation.id} className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 opacity-50">
                  <Image src={car.image} alt={`${car.make} ${car.model}`} width={100} height={60} className="rounded object-cover" />
                  <div className="flex-1">
                    <strong>{reservation.name}</strong> reserved{' '}
                    <b>{car.make} {car.model}</b> ({car.year})<br />
                    from {reservation.pickupDate} → {reservation.returnDate} (${car.pricePerDay}/day)
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
```
**Test Cases:**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| No Reservations | Nothing | Showing the option to search/reserve a car | Showing both otions | PASS |
| 1+ Reservations | Reserved a car | Showing reserved cars under active bookings | A reserved car | PASS |
| 1+ and Cancelled Reservations | Reserving a few cars and cancelling one | Cars under active booking and cancelled reservations | Cars were under active booking and cancelled reservations | PASS |

---
### Hayden Global reservation state
I noticed that we currently had no global context database that would save and send information over across different pages. Where  if you selected to reserve a certain car it would not carry over and be shown in 'my reservations'.  So I went with  a global state approach to manange all the reservations in one place rather than have it done locally so that any page can read or write to reservations. I started with importing the context state from react using client
```
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Reservation } from '../data/mockReservations';
```
I then created some type definitions so that we can update the list/mock data at a later date or remove them with
```
interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => void;
  updateReservationStatus: (id: string, status: 'active' | 'completed' | 'cancelled') => void;
  removeReservation: (id: string) => void;
}
```
This piece works by taking the array of all reservations and adding a new reservation (id, status and booking date)
I then created a const object for reservaton so that when you update it  react will re-render the component.From const ReservationContext = createContext<ReservationContextType | undefined>(undefined); and [reservations, setReservations] = useState<Reservation[]>([]); Additonally making a child component so that we can call useReservations anywhere in the app with const { reservations, addReservation } = useReservations();

Next I added the addReservation, updateReservationStatus and removeReservation functions: Which are to be used in cancel reservations and view reservations
```
const addReservation = (reservationData: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => {
  const newReservation: Reservation = {
    ...reservationData,
    id: `RES${Date.now()}`, // unique id
    status: 'active',
    bookingDate: new Date().toISOString().split('T')[0], // todays date
  };
  setReservations((prev) => [...prev, newReservation]);
};
```
The addReservation function takes partial data and generates a new id and adds the new reservation to the array. The UpdateReservaton then takes that created id and updates the status
```
const updateReservationStatus = (id: string, status: 'active' | 'completed' | 'cancelled') => {
  setReservations((prev) =>
    prev.map((reservation) =>
      reservation.id === id ? { ...reservation, status } : reservation
    )
  );
};
const removeReservation = (id: string) => {
  setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
};
```

The next part I made was a wrapper to be used in the layout.tsx to wrap the entire app so that it can used  anywhere and a custom hook as useReservations as stated earlier.
```
return (
  <ReservationContext.Provider
    value={{
      reservations,
      addReservation,
      updateReservationStatus,
      removeReservation,
    }}
  >
    {children}
  </ReservationContext.Provider>
);
export function useReservations() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
}
```




**Files Modified:**
- context/ReservationContext.tsx
- reserve/page.tsx
- reservation/page.tsx
---
### Khush Patel – UI-5 (Modify Reservation)
**Overview:**  
- We added a modify reservation feature that lets users modify their reservations from the "My Reservations" page. You are able to modify all the same inputs as you did before, whilst making the initial reservation.

**Files Modified:**
- ReservationContext.tsx
I added the updateReservation function the the reservation context. This involved expanding the interface to include the new function and implementing it so that users can update an existing reservation’s details. This includes name, email, car ID, pickup date, and return date. This all can happen while keeping the original ID, status, and booking date intact. The function was then fed through the context provider so that it could be used across the app and updated.

- modify/page.tsx
A new modify page was created to handle all the modification edits the user desires for their booking. This page grabs the reservationId from the URL and automatically fills the form with that reservation’s current data, which includes the user’s name, email, selected car, and pickup/return dates. The form exactly 1 to 1 mirrors the fields from the original reservation page. This feature also includes a validation type that ensures that by accident the return date is not earlier than the pickup date. It also shows a preview of the selected car-displaying its image, make, model, price and location. After making changes, users can update their reservation via the "Update" button (updateReservation function) and are redirected back to the reservations page upon success. Alongside with update, theres a "Cancel" button which allows them to exit without saving, and the page also redirects to /reservations if the reservation ID is invalid or missing.

- reservations/page.tsx
After making the modify component, I have to link it back to the reservations page to display it. So added the button next to "Cancel" for the active bookings. Both of the buttons are arranged inside its flex container, with the proportionate spacing etc. The button links to the /modify component using Next.js's Link componenet. Currently it is simply styled with a blue and black look.

**Code Snippet:**  
ReservationContext.tsx
1. Added Interface
```
interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => void;
  updateReservationStatus: (id: string, status: 'active' | 'completed' | 'cancelled') => void;
  updateReservation: (id: string, reservation: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => void;  // ← NEW
  removeReservation: (id: string) => void;
}
```
2. Added function implementatio
```
const updateReservation = (id: string, reservationData: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => {
  setReservations((prev) =>
    prev.map((reservation) =>
      reservation.id === id
        ? { ...reservation, ...reservationData }
        : reservation
    )
  );
};
```
3. Added to provider value
```
<ReservationContext.Provider
  value={{
    reservations,
    addReservation,
    updateReservationStatus,
    updateReservation,  // ← NEW
    removeReservation,
  }}
>
```

/modify/page.tsx (New)
```
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCars } from "@/app/data/mockCars";
import Image from "next/image";
import { useReservations } from "../context/ReservationContext";

export default function ModifyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reservationId = searchParams.get('reservationId');
    
    const { reservations, updateReservation } = useReservations();
    
    const reservation = reservations.find(r => r.id === reservationId);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        carId: "",
        pickupDate: "",
        returnDate: "",
    });

    // Pre-fill form with existing reservation data
    useEffect(() => {
        if (reservation) {
            setFormData({
                name: reservation.name,
                email: reservation.email,
                carId: reservation.carId,
                pickupDate: reservation.pickupDate,
                returnDate: reservation.returnDate,
            });
        }
    }, [reservation]);

    // Redirect if reservation not found
    useEffect(() => {
        if (!reservationId || !reservation) {
            router.push('/reservations');
        }
    }, [reservationId, reservation, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!reservationId) {
            alert("Reservation ID is missing.");
            return;
        }

        if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
            alert("Return date cannot be earlier than pickup date.");
            return;
        }

        const selectedCar = mockCars.find((c) => c.id.toString() === formData.carId);
        if (!selectedCar) {
            alert("Please select a valid car option.");
            return;
        }

        updateReservation(reservationId, {
            name: formData.name,
            email: formData.email,
            carId: formData.carId,
            pickupDate: formData.pickupDate,
            returnDate: formData.returnDate,
        });

        alert(`Reservation updated for ${selectedCar.make} ${selectedCar.model}!`);
        router.push('/reservations');
    };

    if (!reservation) {
        return null; // Will redirect in useEffect
    }

    return (
        <main className="flex flex-col items-center p-8 min-h-screen bg-grey-500 text-white">
            <h1 className="text-4xl font-bold mb-6 text-black">Modify Reservation</h1>

            {/* Selected Car Preview */}
            {formData.carId && (() => {
                const selectedCar = mockCars.find(car => car.id.toString() === formData.carId);
                return selectedCar ? (
                    <div className="bg-gray-800 p-4 rounded-xl mb-6 max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-2 text-blue-400">Selected Car:</h2>
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-16 rounded-lg overflow-hidden">
                                <Image
                                src={`/cars/${selectedCar.image}`}
                                alt={`${selectedCar.make} ${selectedCar.model}`}
                                width={128}
                                height={128}
                                className="object-cover w-full h-full rounded-lg"
                                onError={(e) => (e.currentTarget.src = "/DefaultCarImage.png")}
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold">{selectedCar.year} {selectedCar.make} {selectedCar.model}</h3>
                                <p className="text-green-400 font-bold">${selectedCar.pricePerDay}/day</p>
                                <p className="text-sm text-gray-400">{selectedCar.location}</p>
                            </div>
                        </div>
                    </div>
                ) : null;
            })()}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-md w-full space-y-4"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    required
                />
                
                {/* Dropdown populated from mockCars dataset */}
                <select
                name="carId"
                value={formData.carId}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
                >
                <option value="">Select a Car</option>
                {mockCars.map((car) => (
                    <option key={car.id} value={car.id.toString()}>
                    {car.make} {car.model} (${car.pricePerDay}/day)
                    </option>
                ))}
                </select>

                {/* Pickup date */}
                <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, pickupDate: e.target.value }))
                }
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
                />

                {/* Return date */}
                <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, returnDate: e.target.value }))
                }
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
                />

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
                    >
                        Update Reservation
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/reservations')}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 p-2 rounded font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}
```

reservations/page.tsx
1. Changed section - both buttons
```
<div className="flex gap-2">
  <Link
    href={`/modify?reservationId=${reservation.id}`}
    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition"
  >
    Modify
  </Link>
  <button
    onClick={() => {
      if (confirm("Cancel this reservation?")) updateReservationStatus(reservation.id, "cancelled");
    }}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition"
  >
    Cancel
  </button>
</div>
```
| Case | Input | Expected Result | Actual Result | Result |
|------|-------|-----------------|---------------|--------|
| Update all reservation fields successfully | Reservation ID: "RES1234567890"<br>New data: {name: "John Doe", email: "john@email.com", carId: "2", pickupDate: "2025-12-01", returnDate: "2025-12-05"} | Reservation with ID "RES1234567890" should have all fields updated, while preserving id, status, and bookingDate | Reservation updated correctly with new values, original id/status/bookingDate preserved | PASS |
| Modify button visible for active reservations | View reservations page with active bookings | "Modify" button displayed beside "Cancel" button for each active reservation | Modify button visible and correctly positioned | PASS |
| Modify button link contains correct reservation ID | Click modify button for reservation with ID "RES1234567890" | URL should be `/modify?reservationId=RES1234567890` | URL contains correct reservation ID | PASS |
| Complete modify flow | 1. View reservations page<br>2. Click Modify on active reservation<br>3. Change name and dates<br>4. Submit form | Reservation updated in context, changes reflected on reservations page | Complete flow works, changes persist and display correctly | PASS |
| Modify with same dates | Update reservation with same pickup and return dates | Should accept same dates (valid case) | Same dates accepted correctly | PASS |
|Modify with very long name | Repeated letters 200 times | Form should accept long name, update reservation | Long name accepted and saved | PASS |


---

## **4. Testing Summary**
| Story ID | Test Description | Method | Result | Verified By |
|-----------|------------------|---------|---------|--------------|
| UI-6 | Profile update stores edited data | Manual UI test | Complete | Arjun Singh |
| UI-3 | Cancel reservation removes entry | Manual UI test | Complete | Sam Oreskovic |
| UI-4 | Rental history loads & shows correctly | Manual UI test | Complete | Connor Davison |
| UI-5 | Modify reservation updates stored data | Manual UI test | Pending | Person |
---

## **5. Sprint Review & Reflection**
**Completed:**  
- UI-6 (Account/Profile) implemented and tested successfully. Profile feature working with mock in-memory storage.
- UI-3 ()
- UI-4 (Reservation History) implemented and testeed successfully. Shows users reservation history and active reservations (mock data)
- UI-5 (Modify Reservation)

**Next Sprint:**  
- REP-1: Car Usage Report (show which cars are most frequently rented)
- REP-2: Daily Rentals Report (show daily rental totals / trends)

---

## **6. Team Blog (Update)**
Team continues to use **Group25-Blog.xlsx** to log sprint work.
Each member will record tasks, meeting notes, and estimated hours.

---

## **7. Submission Checklist**
- `Group25-Sprint02.pdf` (this document)
- `Group25-ProductBacklog.xlsx` (updated backlog)
- `Group25-Blog.xlsx` (updated log)
- Short demo video (1-3 mins) showing feature usage

**Deadline:** Sunday, November 9th, 2025 @ 11:59 PM


