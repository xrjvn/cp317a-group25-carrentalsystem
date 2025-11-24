# CP317A – Sprint 03
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
This sprint focused on improving the long-term stability of the system. In Sprint 02, we completed the full reservation lifecycle, but everything still relied on temporary mock memory. Sprint 03 introduces persistent storage, improves consistency across pages, and cleans up UI elements so the application feels more unified and reliable.

### Objectives  
- Add a simple persistence layer for users and reservations
- Make sure reservation actions (create, modify, cancel) update saved data
- Connect login and sign-up to stored user accounts
- Link the Profile page to persistent user data
- Apply UI consistency fixes across major screens

### Why these stories  
These stories move the project from a front-end demo into something closer to a functioning system. Persistence is a must before we can build manager/admin features or reporting in the next sprint. UI consistency was also important because the project now has enough pages that inconsistent styling breaks the experience. Completing these tasks sets a foundation for Sprint 04, where reporting features will depend heavily on the data saved this sprint

---

## 2. Sprint Backlog

| Story ID | Story Title | Points | Priority | Assigned To | Tasks | Status |
|----------|-------------|--------|----------|-------------|-------|--------|
| SYS-1 | Persistent File Store | 5 | High | **Sam** | Load/save system for reservations & users | *In Progress* |
| SEC-2 | Login and Sign Up (persistent) | 5 | High | **Arjun** | Connect login & signup & profile to stored data | *In Progress* |
| UI-7 | UI Cleanup + Layout Improvements | 3 | Medium | **Connor** | Improve layout, buttons, spacing, card styling | *In Progress* |
| SYS-2 | System-Wide Integration (Sprint Requirement) | 3 | High | **Everyone** | Ensure all features interact with shared persistent state | Ongoing |

---

## 3. Implementation Progress

## **Sprint Integration Summary**
This sprint introduced our first real persistent data system. Instead of relying on mock data that resets on every refresh, the app can now save and load users and reservations from storage. Because of this, login, sign-up, profile editing, and reservation features now share one consistent source of truth.  

This also made Sprint 03 the first sprint where each feature had to work with others instead of standing alone. Changes made on one page now have to show up on all the others, which required more coordination within the team. The result is a system that behaves much more like a real rental platform, with data that stays consistent as the user moves between pages

---
## **Sam Oreskovic – SYS-1 (Persistent File Storing for Reservations)**

### **Overview**
I primarily focused on persistent file storing for user reservations. I started by creating an api route file called `route.ts`, which allows the system to GET, POST, and DELETE reservations from users. I then updated the `ReservationContext.tsx` file, in order to load the given json file each time the website starts. With these changes, users can now add and view reservations from their profiles without having them reset upon a page refresh, meaning that their changes are saved across sessions.

### **Files Modified**
`/src/app/api/reservations/route.ts` - (Created)
`/src/app/data/reservations.json` - (Created)
`/src/app/context/ReservationContext.tsx` - (Modified)

### **Key Work Completed**
- Created a JSON file that accurately stores user reservations
- Ensured changes persist after reload
- Rerouted reservation context to call functions based on local storage appropriately

### **Code Snippet:**
```
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/app/data/reservations.json");

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
}

function loadReservations() {
  ensureFile();
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  if (!raw) return [];

  let data = JSON.parse(raw);

  return data.map((r: any) => ({
    ...r,
    status: r.status ?? "active",
  }));
}

function saveReservations(reservations: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(reservations, null, 2), "utf-8");
}

//Get all reservations
export async function GET() {
    const reservations = loadReservations();
    return NextResponse.json(reservations);
}

//Post new reservation
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const reservations = loadReservations();

    const newReservation = {
      ...body,
      id: body.id ?? Date.now().toString(),
      status: "active",
    };

    reservations.push(newReservation);
    saveReservations(reservations);

    return NextResponse.json({ reservation: newReservation }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reservations error:", err);
    return NextResponse.json({ error: "Failed to add reservation" }, { status: 500 });
  }
}
//Update a reservation (cancel, modify, etc.)
export async function PUT(req: Request) {
  try {
    const { id, status, ...rest } = await req.json();

    let reservations = loadReservations();

    reservations = reservations.map((r: any) =>
      r.id === id
        ? {
            ...r,
            ...rest,
            status: status ?? r.status,
          }
        : r
    );

    saveReservations(reservations);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/reservations error:", err);
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}

// Delete reservation
export async function DELETE(req: Request) {
    const { id } = await req.json();
    let reservations = loadReservations();
    reservations = reservations.filter(r => r.id !== id);
    saveReservations(reservations);

    return NextResponse.json({ message: "Reservation removed" });
}
```

### **Testing**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Create reservation | Input reservation info and add | Reservations should be added to JSON file | Reservations are listed in JSON file | PASS |
| Delete reservation | Press cancel button | Reservation should delete from page and JSON file | Reservations are deleted from both | PASS |
| Access reservations through profile | Open profile page | Reservations should be listed | Reservations are listed on profile page | PASS |
| Page reload | Refresh browser | Reservations should save after reload | Reservations save and are shown upon reload | PASS |

**Verification:**  Sam

---
## **Arjun Singh – SEC-2 (Persistent Login & Sign-Up & Profile)**

### **Overview**
My work this sprint focused on connecting the authentication pages and Profile page to the new persistent storage system. Previously, the login and sign-up pages used temporary mock data. Now, users can create an account, log in, and update their profile — and these changes are saved so they remain after refreshing or navigating away.

### **Files Modified**
- `/src/app/login/page.tsx`
- `/src/app/signup/page.tsx`
- `/src/app/profile/page.tsx`

### **Key Work Completed**
- Created a working Sign-Up page that saves new users to persistent storage  
- Updated Login page to authenticate against saved user data
- Connected the Profile page so users can edit their stored information  
- Ensured changes persist after reload

### **Testing**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Create new account | Email, password, license | User saved to persistent store | Works correctly | PASS |
| Login with stored user | Valid credentials | Redirect to profile | Works correctly | PASS |
| Update profile info | Edit any field | Stored user object updated | Works correctly | PASS |
| Page reload | Refresh browser | User still logged in | Works correctly | PASS |

**Verification:** Arjun  

---

## ** SYS-2 | System-Wide Integration **
TEMPORARY info/list of things added
- name, email, date autofill, sign out


## **Connor Davison – UI-7 UI Cleanup & Layout Improvements**  
### **Overview**
Added a checkout page where reservations are only confirmed under newly added checkout page. Updated the reservations page to prompt users to log in or sign up if they aren’t. 
Added a small graph that shows how much the user is spenidng on which car. Could be implemented for how much the user has spent overall for their past completed cars.

### **Files Modified**
 `/src/app/reservations/page.tsx`
 `/src/app/profile/page.tsx`

 ### **Filed Added **
 `/src/app/checkout`
 `/src/app/checkout/page.tsx`


**Code Snippet:**  
Ceckout Page:
```tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { mockCars } from "@/app/data/mockCars";
import { useReservations } from "../context/ReservationContext";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addReservation } = useReservations();

  const carId = searchParams.get("carId");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const car = mockCars.find((c) => c.id.toString() === carId);

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-grey-500 text-white">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-1xl font-bold mb-8 text-center bg-gray-700 text-gray-200 p-6 rounded-xl shadow-lg">Please log in to confirm your reservation.</p>
        <div className="flex gap-6">
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Login</a>
          <a href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Sign Up</a>
        </div>
      </main>
    );
  }


  //If missing any info, redirect back to reserve
  if (!car || !pickupDate || !returnDate) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-grey-500 text-white">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <a href="/reserve" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Back to Reserve</a>
      </main>
    );
  }

  const days = Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)));
  const total = car.pricePerDay * days;

  const handleConfirm = () => {
    addReservation({
      name: user.name,
      email: user.email,
      carId: car.id,
      pickupDate,
      returnDate,
    });
    router.push("/reservations");
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 bg-grey-500 text-white">
      <h1 className="text-4xl font-bold mb-6 text-black">Confirm Your Reservation</h1>
      <div className="bg-gray-800 p-6 rounded-xl mb-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-2 text-blue-400">Car Details</h2>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-16 rounded-lg overflow-hidden">
            <img src={`/cars/${car.image}`} alt={`${car.make} ${car.model}`} className="object-cover w-full h-full rounded-lg" onError={(e) => (e.currentTarget.src = "/DefaultCarImage.png")}/>
          </div>
          <div>
            <h3 className="font-semibold">{car.year} {car.make} {car.model}</h3>
            <p className="text-green-400 font-bold">${car.pricePerDay}/day</p>
            <p className="text-sm text-gray-400">{car.location}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full mb-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-400">Reservation Details</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Pickup Date:</b> {pickupDate}</p>
        <p><b>Return Date:</b> {returnDate}</p>
        <p><b>Total Days:</b> {days}</p>
        <p className="text-green-400 font-bold mt-2"><b>Total Cost:</b> ${total}</p>
      </div>
      <div className="flex flex-col gap-4 max-w-md w-full">
        <button onClick={handleConfirm} className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold">Confirm Reservation</button>
        <button onClick={() => router.back()} className="w-full bg-gray-600 hover:bg-gray-700 p-3 rounded font-semibold">Go Back</button>
      </div>
    </main>
  );
}
```


**Code Snippet:**  
Profile Page Costs:
```tsx
      {/* Spending Summary Box */}
      <div className="w-full flex justify-center mt-6">
        <SpendingSummary email={user.email} />
      </div>
    </main>
  );
}

//  Calculate each car spending and total spending
function SpendingSummary({ email }: { email: string }) {
  const { reservations } = useReservations();
  const userReservations = reservations.filter(r => r.email === email && r.status === "active");
  const spendingByReservation = userReservations.map(r => {
    const car = mockCars.find(c => c.id.toString() === r.carId);
    const pricePerDay = car?.pricePerDay || 0;
    const days = Math.max(1, Math.ceil((new Date(r.returnDate).getTime() - new Date(r.pickupDate).getTime()) / (1000 * 60 * 60 * 24)));
    return { id: r.id, car: car ? `${car.make} ${car.model}` : 'Unknown', total: pricePerDay * days };
  });
  const totalSpent = spendingByReservation.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow w-full max-w-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2 text-gray-800 text-center">Current Reservation Spending</h2>
      <p className="mb-4 text-gray-700 text-center">Total: <span className="font-bold text-green-600">${totalSpent}</span></p>
      <div className="space-y-2 w-full flex flex-col items-center">
        {spendingByReservation.map(r => {
          const percent = totalSpent ? (r.total / totalSpent) * 100 : 0;
          return (
            <div key={r.id} className="flex items-center gap-2 w-full justify-center">
              <span className="w-32 text-gray-600 text-right">{r.car}</span>
              <div className="h-4 bg-gray-300 rounded relative" style={{ width: '180px' }}>
                <div style={{ width: `${percent}%`, minWidth: '12px' }} className="h-4 bg-blue-500 rounded transition-all absolute left-0 top-0"></div>
              </div>
              <span className="ml-2 text-gray-800 font-semibold">${r.total}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```
 

### **Key Work Completed**
- Added a checkout page to confirm reservations before finalizing.
- Updated reservations page to prompt users to log in or sign up if not authenticated.
- Ensured reservations are only confirmed after user approval on the checkout page.
- Calculated the users total spending and displays it under progile

### **Testing**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Reserve car checkout (not logged in) | Visit Checkout Page | Promt to log in or sign up | Prompt Shown | PASS |
| Reserve car checkout (logged in) | Fill out reserve form and checkout | Redirects to checkout page | Redirect Works | PASS |
| Checkout page confirmation | Click confirm reservation | Reservation added and redirects to reservations | Works correctly | PASS |
| Checkoutpage go back | Click Go Back on checkout page | Returns to previouis page | Returns correctly | PASS |
| Accessing My Reservation not logged in | Access My Reservations | Tell the User to log in or sign up | Tells the User to log or sign in | PASS |
| Users total reservations cost | Access profile and see cost | Showing the user their total costs | Displays Total Cost | PASS |

**Verification:** Connor  

---

## 4. Testing Summary

| Story ID | Test Description | Method | Result | Verified By |
|----------|------------------|--------|--------|--------------|
| SEC-2 | Auth uses persistent user store | Manual UI test | Complete | Arjun |
| SYS-1 | Reservations/users load/save correctly | Manual | Pending | PersonX |
| UI-7 | UI improvements applied consistently | Visual/manual | Pending | PersonX |
| SYS-2 | Features interact with shared persistent state | Manual | Ongoing | Team |

---

## 5. Sprint Review & Reflection

### **Completed**
- Persistent user storage connected to login/sign-up/profile
- 
- 
- 
- 

### **Reflection**
(fill this in)
---

## **6. Team Blog (Update)**
All members updated **Group25-Blog.xlsx** with hours and tasks.

---

## **7. Submission Checklist**
- `Group25-Sprint03.pdf`
- `Group25-ProductBacklog.xlsx` (updated)  
- `Group25-Blog.xlsx` (updated)  
- 1–3 minute demo video

**Deadline:** Sunday, November 16th, 2025 @ 11:59 PM
