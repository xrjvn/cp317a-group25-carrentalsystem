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

### Khush Patel & Hayden Gdanski – UI-1 (Search Cars)
**Overview:**
- Developed a sample dataset containing a list of 8 different cars that include details like make,model,year, price, features etc.
- Additionally worked on a comprehensive filter system; Pickup & return dates (date inputs) Car type, location, fuel type, transmission (dropdown selects) maximum price per day (number input)
- State management using React hooks (searchFilters, searchResults)
- User interface features (search/clear buttons, Results counter showing number of cars found)
- Car display cards made with optimized Next.js Image component
- Styling used Tailwind CSS 

### Connor Davison - UI-1 (Search Cars/Reserve add ons)

- Attached a button link to "Reserve" on the search page; Redirects user to reserve page with details of the car that is selected.
- Attached Images to Cars
- 
**Code Snippet:**
```tsx
<main className="flex flex-col items-center p-8 min-h-screen bg-gray-950 text-white">
            <h1 className="text-4xl font-bold mb-6">Reserve a Car</h1>

            {/* Selected Car Preview */}
            {formData.carId && (() => {
                const selectedCar = mockCars.find(car => car.id.toString() === formData.carId);
                return selectedCar ? (
                    <div className="bg-gray-800 p-4 rounded-xl mb-6 max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-2 text-blue-400">Selected Car:</h2>
                        <div className="flex items-center space-x-4">
                            {/* Have the car's actual image show */}
                            <div className="w-24 h-16 rounded-lg overflow-hidden">
                                <Image
                                    src={selectedCar.image}
                                    alt={`${selectedCar.make} ${selectedCar.model}`}
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
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
```

**Files Modified:**
- /app/search/page.tsx
- app/data/mockCars.ts

**Code Snippet:**
```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockCars, carTypes, locations, fuelTypes, transmissions, Car } from '../data/mockCars';

export default function SearchPage() {
  const [searchFilters, setSearchFilters] = useState({
    pickupDate: '',
    returnDate: '',
    carType: '',
    location: '',
    fuelType: '',
    transmission: '',
    maxPrice: ''
  });

  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let filteredCars = mockCars.filter(car => {
      // Filter by car type
      if (searchFilters.carType && car.type !== searchFilters.carType) {
        return false;
      }
      
      // Filter by location
      if (searchFilters.location && car.location !== searchFilters.location) {
        return false;
      }
      
      // Filter by fuel type
      if (searchFilters.fuelType && car.fuelType !== searchFilters.fuelType) {
        return false;
      }
      
      // Filter by transmission
      if (searchFilters.transmission && car.transmission !== searchFilters.transmission) {
        return false;
      }
      
      // Filter by max price
      if (searchFilters.maxPrice && car.pricePerDay > parseInt(searchFilters.maxPrice)) {
        return false;
      }
      
      return car.available;
    });

    setSearchResults(filteredCars);
    setHasSearched(true);
  };

  const clearFilters = () => {
    setSearchFilters({
      pickupDate: '',
      returnDate: '',
      carType: '',
      location: '',
      fuelType: '',
      transmission: '',
      maxPrice: ''
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search for Cars</h1>
          <p className="text-gray-600">Find the perfect car for your trip</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pickup Date */}
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  value={searchFilters.pickupDate}
                  onChange={(e) => handleFilterChange('pickupDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Return Date */}
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  value={searchFilters.returnDate}
                  onChange={(e) => handleFilterChange('returnDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Car Type */}
              <div>
                <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Type
                </label>
                <select
                  id="carType"
                  value={searchFilters.carType}
                  onChange={(e) => handleFilterChange('carType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {carTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  value={searchFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  value={searchFilters.fuelType}
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map(fuel => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  id="transmission"
                  value={searchFilters.transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Transmissions</option>
                  {transmissions.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>

              {/* Max Price */}
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price/Day ($)
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  value={searchFilters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search Cars
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({searchResults.length} cars found)
              </h2>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((car) => (
                  <div key={car.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 relative">
                      <Image
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <span className="text-sm text-gray-500">{car.type}</span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>📍 {car.location}</p>
                        <p>⛽ {car.fuelType}</p>
                        <p>🔧 {car.transmission}</p>
                        <p>📊 {car.mileage.toLocaleString()} miles</p>
                      </div>

                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {car.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                          {car.features.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{car.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            ${car.pricePerDay}
                          </span>
                          <span className="text-gray-600">/day</span>
                        </div>
                        <Link 
                          href={`/reserve?carId=${car.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                          Reserve
                        </Link>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

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
- UI-2 (Search) Succesfully implimented and tested. Page renders cars filtered by users search preference. Reserve button linked to reserve page with car id selected
- UI-2 (Reserve) successfully implimented and tested. Page renders reserve UI and lists complete reservations at the bottom of the page.

**Next Sprint:**  
- Add backend authentication and user sessions. Connect login to profile and reservation pages
- Finalize search and reservation UIs
- Implement registration and manager roles
- Fix the Search UI layout, and feature placements. Make it more accesible.
- Possibly include some UI developed componenets for the dropdowns, menu, button interactions
- Make all components responsive, better situated for users. 
- Give clarity to design (ie. buttons where they should be, follow a user-flow structure)

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
