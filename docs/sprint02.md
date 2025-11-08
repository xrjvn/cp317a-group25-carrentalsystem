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

---

### Connor Davison – UI-3 (Cancel Reservation)
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

### Person X – UI-4 (View Rental History)
**Overview:**  
(write notes here)

**Files Modified:**
- 

**Code Snippet:**  
```tsx
// fill code here
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


