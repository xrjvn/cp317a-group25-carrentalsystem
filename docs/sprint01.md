# CP317A – Sprint 01
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
Deliver the **first functional prototype** of the Car Rental System.

### Objectives
- Implement a **working login prototype** with mock authentication.
- Develop a **car search page** using test data with filters for car type and dates.
- Build a basic **reservation form** to simulate booking creation.
- Establish a consistent **UI layout and navigation structure** for future sprints.

**Why these stories:**
They form the foundation of the system — every feature onward (modifications, reports, profiles) depends on users being able to log in, search for cars, and book a reservation.

---

## 2. Sprint Backlog
| Story ID | Story Title | Points | Priority | Assigned To | Tasks | Status |
|-----------|-------------|---------|-----------|--------------|--------|---------|
| SEC-1 | Secure Login | 8 | High | Arjun Singh | Implement login page with mock auth and validation | Completed |
| UI-1 | Search Cars | 5 | High | Person 2 & Person 3 | Create search form + results page with mock data | In Progress |
| UI-2 | Reserve Car | 8 | High | Person 4 & Person 5 | Build booking form and temporary storage logic | In Progress |

---

## 3. Implementation Progress

### Arjun Singh – SEC-1 (Secure Login)
**Overview:**
Developed a functional login prototype in `/app/login/page.tsx` to simulate basic authentication.
The form validates user credentials and displays login status messages locally.
A mock authentication check validates `testuser` / `test123`.
No backend yet; future sprints will take that on.

**Files Modified:**  
- `/app/login/page.tsx` – Login component
- Verified functionality locally at [http://localhost:3000/login](http://localhost:3000/login)  

**Code Snippet:**
```tsx
"use client";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "testuser" && password === "test123") {
      setMessage("✅ Login Successful – Redirecting to Dashboard...");
    } else {
      setMessage("❌ Invalid credentials");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>
        <input
          type="text"
          placeholder="Username"
          className="border w-full mb-3 p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-3 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
          Login
        </button>
        <p className="mt-3 text-center">{message}</p>
      </form>
    </main>
  );
}
```

---

### Person 2 & Person 3 – UI-1 (Search Cars)
**Overview:**
(Write a few sentences about progress here, like how you built or mocked the car search feature using static JSON data or sample car listings.)

**Files Modified:**
(List the main file paths, e.g. /app/search/page.tsx.)

**Code Snippet:**
(/CODE GOES HERE/)

---

### Sam Oreskovic – UI-2 (Reserve Car)
**Overview:**
- Developed the simple UI for the reserve page
- Developed backend for UI
- Used mockCars dataset for car values
- No writing to dataset yet, will be added in future iterations
- No pictures for the reserved cars, will be added in future iterations
  
**Files Modified:**
- `/app/src/reserve/page.tsx` – Reserve component
- Verified functionality locally at [http://localhost:3000/reserve](http://localhost:3000/reserve)

**Code Snippet:**
```tsx
"use client";
import React, { useState } from "react";
import { mockCars } from "@/app/data/mockCars";
import Image from "next/image";


export default function ReservePage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        carId: "",
        pickupDate: "",
        returnDate: "",
    });

    const [reservations, setReservations] = useState<any[]>([]);

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

        const newReservation = { ...formData, car: selectedCar };
        setReservations([...reservations, newReservation]);

        alert(`Reservation confirmed for ${selectedCar.make} ${selectedCar.model}!`);
        setFormData({ name: "", email: "", carId: "", pickupDate: "", returnDate: "" });
    };

    return (
        <main className="flex flex-col items-center p-8 min-h-screen bg-gray-950 text-white">
            <h1 className="text-4xl font-bold mb-6">Reserve a Car</h1>

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
            {reservations.length > 0 && (
                <div className="mt-8 bg-gray-900 p-4 rounded-xl max-w-md w-full">
                    <h2 className="text-2xl mb-2">Current Reservations</h2>
                    {reservations.map((r, i) => (
                    <div key={i} className="border-t border-gray-700 py-2 text-sm flex items-center gap-3">
                        
                        {/* CURRENTLY A STATIC IMAGE, CHANGE TO DYNAMIC, PER-CAR IMAGE IN LATER ITERATIONS */}
                        <Image
                        src={r.car.image && r.car.image.trim() !== "" ? r.car.image : "/DefaultCarImage.png"}
                        alt={`${r.car.brand ?? "Car"} ${r.car.model ?? ""}`}
                        width={100}
                        height={60}
                        className="rounded object-cover"
                        unoptimized
                        />
                        <div>
                        <strong>{r.name}</strong> reserved
                        <b> {r.car.brand} {r.car.model}</b> ({r.car.year})<br />
                        from {r.pickupDate} &rarr; {r.returnDate} (${r.car.pricePerDay}/day)
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </main>
    );
}
```


---

## **4. OVERALL Testing & Review**
| Story ID | Test Description | Method | Result | Verified By |
|-----------|------------------|---------|---------|--------------|
| SEC-1 | Login accepts valid credentials | Manual UI test | Complete | Arjun Singh |
| UI-1 | Search returns cars by filter | Manual UI test | Complete | Connor Davison |
| UI-2 | Reservation stores temporary booking | Manual UI test | Complete | Sam Oreskovic |

---

## **5. Sprint Review & Reflection**
**Completed:**  
- SEC-1 (Secure Login) implemented and tested successfully. Page renders correctly on localhost and validates user input.
- /
- UI-2 (Reserve) successfully implimented and tested. Page renders reserve UI and lists complete reservations at the bottom of the page.

**Next Sprint:**  
- Add backend authentication and user sessions. Connect login to profile and reservation pages
- Finalize search and reservation UIs
- Implement registration and manager roles

---

## **6. Team Blog (Update)**
Team continues to use **Group25-Blog.xlsx** to log sprint work.
Each member should record tasks, meeting notes, and estimated hours.

---

## **7. Submission Checklist**
Before submitting Sprint 01, ensure the following files are uploaded:
- `Group25-Sprint01.pdf` (this document)
- `Group25-ProductBacklog.xlsx` (updated backlog)
- `Group25-Blog.xlsx` (updated log)

**Deadline:** Sunday, October 26, 2025 @ 11:59 PM
