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
These features complete the basic customer lifecycle for booking usage. Users can now manage, see, modify, and cancel their own past bookings.

---

## 2. Sprint Backlog

| Story ID | Story Title | Points | Priority | Assigned To | Tasks | Status |
|----------|-------------|--------|----------|-------------|-------|--------|
| UI-3 | Cancel Reservation | 3 | Medium | <NAME> | Implement remove reservation from mock DB | In Progress |
| UI-4 | View Rental History | 2 | Low | <NAME> | Show past rentals from mock DB | Completed |
| UI-5 | Modify Reservation | 5 | Medium | <NAME> | Update reservation record in mock DB | In Progress |
| UI-6 | Account / Profile | 5 | Medium | Arjun Singh | Profile page + mock store setup completed | Completed |

---

## 3. Implementation Progress

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
    alert("✅ Profile saved (mock).");
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
- Modified `reserve/page.tsx` to include a cancel button inside the temporary reservation list. Connected to `removeReservation()` for easy deletion
- Added working Cancel buttons beside each active booking in `reservations/page.tsx`. Added web confirmation prompts to confirm each cancellation on this page.
- Ensured car images are shown on each reservation, regardless of their page.
- Verified that deleting a reservation on `/reservations` reflects on `/reserve`, and vice-versa, using context in `context/ReservationContext.tsx`
  

**Files Modified:**
- `/src/app/reserve/page.tsx`  (modified)
- `/src/app/reservations/page.tsx` (modified)
- `/src/app/data/mockCars` (modified)

**Testing/Verification:**
- Reserved multiple cars via `/reserve` ("Reserve" tab).
- Viewed all active bookings on `/reservations` ("My Reservations" tab).
- Clicking cancel instantly removes the selected booking from both pages.
- Confirmed image is showing on both pages correctly.

**Outcome:**
The Cancel Reservation feature is now fully implemented, functional, and is globally syncronized between pages, without the need to reload.

**Code Snippet:**  
```tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCars } from "@/app/data/mockCars";
import Image from "next/image";
import { useReservations } from "../context/ReservationContext";




export default function ReservePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const preSelectedCarId = searchParams.get('carId');
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        carId: preSelectedCarId || "",
        pickupDate: "",
        returnDate: "",
    });
    const { reservations, addReservation, removeReservation } = useReservations();


    // Update carId when URL parameter changes
    useEffect(() => {
        if (preSelectedCarId) {
            setFormData(prev => ({ ...prev, carId: preSelectedCarId }));
        }
    }, [preSelectedCarId]);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
            alert("Return date cannot be earlier than pickup date.");
            return;
        }

        const selectedCar = mockCars.find((c) => c.id.toString() === formData.carId);
        if (!selectedCar) return alert("Please select a valid car option.");

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

    };

    const handleCancel = (index: number) => {
        removeReservation(reservations[index].id);
    };


    return (
        <main className="flex flex-col items-center p-8 min-h-screen bg-grey-500 text-white">
            <h1 className="text-4xl font-bold mb-6 text-black">Reserve a Car</h1>

            {/* Selected Car Preview */}
            {formData.carId && (() => {
                const selectedCar = mockCars.find(car => car.id.toString() === formData.carId);
                return selectedCar ? (
                    <div className="bg-gray-800 p-4 rounded-xl mb-6 max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-2 text-blue-400">Selected Car:</h2>
                        <div className="flex items-center space-x-4">
                            {/* Insert Car Image*/}
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

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
                >
                    Confirm Reservation
                </button>
            </form>

            {/* Temporary reservation list */}
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
                    <b>
                        {car?.make} {car?.model}
                    </b>{" "}
                    ({car?.year})
                    <br />
                    from {r.pickupDate} → {r.returnDate} (${car?.pricePerDay}/day)
                    </div>
                </div>

                {/* Cancel button */}
                <button
                    onClick={() => handleCancel(i)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                >
                    Cancel
                </button>
                </div>
            );
            })}
        </main>
    );
}
```

---

### Connor Davidson – UI-4 (View Rental History)
**Overview:**  
Reservation page implemented under `/src/app/reservations/page.tsx`. Mock data works show shows under users reservations tab

**Files Modified:**
- `/src/app/reservations/page.tsx`  (created)
- `/src/data/mockReservations.ts` (created)


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
| UI-3 | Cancel reservation removes entry | Manual UI test | Pending | Person |
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
- Move persistence into real DB file
- 
- 

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


