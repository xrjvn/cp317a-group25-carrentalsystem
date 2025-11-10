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
Reservation page implemented under `/src/app/reservations/page.tsx`. Mock data works show shows under users reservations tab

**Files Modified:**
- `/src/app/reservations/page.tsx`  (created)

- New Modifications:
  Data from reservations is now reserved under Context/reservationContext and is functional under My Reservations tab.
  User is able to see, modift and cancel current active bookings. The user is also able to see cancelled bookings (If they had any)


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
### Person X – UI-5 (Modify Reservation)
**Overview:**  
(write notes here)

**Files Modified:**
- 

**Code Snippet:**  
```tsx
// fill code here
```

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
- UI-5 ()

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


