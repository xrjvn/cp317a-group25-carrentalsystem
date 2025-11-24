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
| SYS-1 | Persistent File Store | 5 | High | **Sam** | Load/save system for reservations & users | *Completed* |
| SEC-2 | Login and Sign Up (persistent) | 5 | High | **Arjun** | Connect login & signup & profile to stored data | *Completed* |
| UI-7 | UI Cleanup + Layout Improvements | 3 | Medium | **Connor** | Improve layout, buttons, spacing, card styling | *Completed* |
| SYS-2 | System-Wide Integration | 3 | High | **Everyone** | Ensure all features interact with shared persistent state | Completed |

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

### **Code Snippet:**
```
/src/lib/persistence.ts
export async function loadUsers() {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("users");
  return stored ? JSON.parse(stored) : [];
}

export async function saveUsers(users: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("users", JSON.stringify(users));
}

export async function findUserByEmail(email: string) {
  const users = await loadUsers();
  return users.find((u: any) => u.email === email);
}

export async function addUser(user: any) {
  const users = await loadUsers();
  users.push(user);
  await saveUsers(users);
}


/src/app/signup/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addUser, findUserByEmail } from "../../lib/persistence";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    license: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const existing = await findUserByEmail(form.email);
    if (existing) {
      alert("Email already registered.");
      return;
    }

    await addUser(form);

    alert("Account created!");
    router.push("/login");
  };

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSignup} className="space-y-4">
        <input name="name" placeholder="Name" className="w-full p-2 border rounded" onChange={handleChange}/>
        <input name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange}/>
        <input name="password" placeholder="Password" type="password" className="w-full p-2 border rounded" onChange={handleChange}/>
        <input name="license" placeholder="Driver’s License" className="w-full p-2 border rounded" onChange={handleChange}/>

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Create Account
        </button>
      </form>
    </main>
  );
}


/src/app/login/page.tsx
import { redirect } from "next/navigation";
import { findUserByEmail } from "../../lib/persistence";

export default function LoginPage() {

  async function handleLogin(formData: FormData) {
    "use server";

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const user = await findUserByEmail(email);

    if (!user) throw new Error("No user found with that email.");
    if (user.password !== password) throw new Error("Incorrect password.");

    localStorage.setItem("currentUser", JSON.stringify(user));

    redirect("/profile");
  }

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form action={handleLogin} className="space-y-4">
        <input type="email" name="email" required className="w-full border p-2 rounded" placeholder="Email"/>
        <input type="password" name="password" required className="w-full border p-2 rounded" placeholder="Password"/>
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </main>
  );
}


/src/app/profile/page.tsx
import { useState, useEffect } from "react";
import { loadUsers, saveUsers } from "../../lib/persistence";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleSave = async () => {
    if (!user) return;

    const users = await loadUsers();
    const updated = users.map((u: any) =>
      u.email === user.email ? user : u
    );

    await saveUsers(updated);
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Profile updated!");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="space-y-4 bg-white p-4 rounded shadow">
        <input value={user.name} className="w-full border p-2 rounded" onChange={e => setUser({ ...user, name: e.target.value })}/>
        <input value={user.email} className="w-full border p-2 rounded" onChange={e => setUser({ ...user, email: e.target.value })}/>
        <input value={user.license} className="w-full border p-2 rounded" onChange={e => setUser({ ...user, license: e.target.value })}/>

        <button onClick={handleSave} className="bg-blue-600 text-white p-2 rounded">
          Save Changes
        </button>
      </div>
    </main>
  );
}
```

### **Testing**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Create new account | Email, password, license | User saved to persistent store | Works correctly | PASS |
| Login with stored user | Valid credentials | Redirect to profile | Works correctly | PASS |
| Update profile info | Edit any field | Stored user object updated | Works correctly | PASS |
| Page reload | Refresh browser | User still logged in | Works correctly | PASS |

**Verification:** Arjun  

---

## ** Hayden Gdanski, SYS-2 | System-Wide Integration **
### **Overview**
Added an autofill feature that reads the currentuser from local storage and autofills the name and email if a user is logged in.
Added autofill dates from the search page so that the pickup and return dates are passed over. Added an overlap detection for dates so that if the same car is booked during the same time as another person it makes u choose a different date.


### **Files Modified**
reserve/page.tsx
search/page.tsx

**Code Snippet:**  
Autofill name and email  to reserve from local storage
```
    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            try {
                const user = JSON.parse(currentUser);
                setFormData(prev => ({
                    ...prev,
                    name: user.name || "",
                    email: user.email || ""
                }));
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);
```
Autofills dates from the search page
```
 useEffect(() => {
        if (preSelectedPickupDate) {
            setFormData(prev => ({ ...prev, pickupDate: preSelectedPickupDate }));
            setPickupDate(new Date(preSelectedPickupDate));
        }
        if (preSelectedReturnDate) {
            setFormData(prev => ({ ...prev, returnDate: preSelectedReturnDate }));
            setReturnDate(new Date(preSelectedReturnDate));
        }
    }, [preSelectedPickupDate, preSelectedReturnDate]);
```
Checks if the reservation dates overlaps with existing reservations for the same car to prevent double booking
```
 const hasConflict = reservations.some(reservation => {
            // Only check active reservations for the same car
            if (reservation.carId !== formData.carId || reservation.status !== 'active') {
                return false;
            }
            const newPickup = new Date(formData.pickupDate);
            const newReturn = new Date(formData.returnDate);
            const existingPickup = new Date(reservation.pickupDate);
            const existingReturn = new Date(reservation.returnDate);
            // Check if date ranges overlap
            return (newPickup <= existingReturn && newReturn >= existingPickup);
        });

        if (hasConflict) {
            alert("This car is already reserved during the selected dates. Please choose different dates.");
            return;
        }
```

### **Testing**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
|check reserve page with a logged in user |localStorage.currentUser = {name: "Hayden", email: "haydengdanski@gmail.com"} | auto fills the name and email in the reserve page | data is filled out| PASS|
|check reserve page with no user logged in| no current user in the local storage| data should be unfilled and ask to enter information| Data is empty and asks to be filled | PASS|
|overlapped date| new reservation pick up and return date equal an existing date| user gets an alert and has to enter in a different date that isnt currently in use| alert displayed and promted to try a different date| PASS|
|no overlap different same car| Reservation date pick up and return date picked that does not already exist | no error, user is prompted to checkout page and allows booking | booking allowed|PASS|
|Pass dates from search to reserve page| click reserve with selected pickup and return dates on the searchpage| dates should be automatically filled out in the reserve page| pickup date and return date are pre filled| PASS|
|missing dates| no pick or return date is entered| user has to refill in the data and enter dates| user gets prompted to go back to the reserve page and has to re-enter data| PASS|



## **Connor Davison – UI-7 UI Cleanup & Layout Improvements**  
### **Overview**
Added a checkout page where reservations are only confirmed under newly added checkout page. Updated the reservations page to prompt users to log in or sign up if they aren’t. 
Added a small graph that shows how much the user is spenidng on which car. Could be implemented for how much the user has spent overall for their past completed cars. Added a sign out button to remove the current user from local stroage

### **Files Modified**
 `/src/app/reservations/page.tsx`
 `/src/app/profile/page.tsx`

 ### **Filed Added **
 `/src/app/checkout`
 `/src/app/checkout/page.tsx`


**Code Snippet:**  
Checkout Page:
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
 Sign out feature: implements a button in the profile page to sign out the current user in local storage and redirects them to sign back in.
 ```
   const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };
    <button 
    onClick={handleSignOut} 
    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
    >
    Sign Out
    </button>
    </div>
 ```
 

### **Key Work Completed**
- Added a checkout page to confirm reservations before finalizing.
- Updated reservations page to prompt users to log in or sign up if not authenticated.
- Ensured reservations are only confirmed after user approval on the checkout page.
- Calculated the users total spending and displays it under progile
- Added sign out feature to log out the current user and redirect them to log in

### **Testing**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Reserve car checkout (not logged in) | Visit Checkout Page | Promt to log in or sign up | Prompt Shown | PASS |
| Reserve car checkout (logged in) | Fill out reserve form and checkout | Redirects to checkout page | Redirect Works | PASS |
| Checkout page confirmation | Click confirm reservation | Reservation added and redirects to reservations | Works correctly | PASS |
| Checkoutpage go back | Click Go Back on checkout page | Returns to previouis page | Returns correctly | PASS |
| Accessing My Reservation not logged in | Access My Reservations | Tell the User to log in or sign up | Tells the User to log or sign in | PASS |
| Users total reservations cost | Access profile and see cost | Showing the user their total costs | Displays Total Cost | PASS |
|sign out| *clicks sign out button* | local storage clears the current user and then redirects to login page | removes correctly and redirects|PASS|

**Verification:** Connor  

---

## **Khush Patel – UI-8 (React & Tailwind CSS UI Implementation)**

### **Overview**

For my portion of the sprint, I focused on elevating the user interface design across the Search and Reserve pages. I did this by implementing modern React components and good Tailwind CSS styling. The work done transformed basic HTML form elements into polished, professional UI that provide a more enhanced user experience. These components provide consistent styling and intuitive visual feedback. The implementation involved integrating third-party React libraries such as `react-datepicker` & `react-select`. All the filter dropdowns were replaced with a style `react-select` and date inputs were upgraded to `react-datepicker` with custom calendar styling. Both pages now have consistent form input styling with focus states (blue borders and rings), hover effects, gradient designs, improved visual hierarchy through the section headers and dividers.

### **Files Modified**
`/app/src/app/search/page.tsx`
`/app/src/app/reserve/page.tsx`

### **Key Work Completed**
- React DatePicker Itegration; for date selection, custom Tailwind CSS styling for calendar popup
- React Select Dropdowns; replaced native selects, custom selectStyles configuration, are used in Search & Reserve page
- Form Input Enhancements; consistent styling, focus states with bue borders, rings, spacing, hover effects.
- Button & Layout Improvement; responsive grid layouts, enhanced selected car preview card, hover effects

### **Code Snippets**

#### **1. React Select Custom Styling Configuration**

```typescript
// Custom Tailwind-styled theme for react-select
const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    padding: '0.125rem 0.5rem',
    minHeight: '42px',
    fontSize: '0.875rem',
    '&:hover': {
      border: '2px solid #d1d5db',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#3b82f6'
      : state.isFocused
      ? '#eff6ff'
      : 'white',
    color: state.isSelected ? 'white' : '#111827',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e5e7eb',
    marginTop: '0.25rem',
    zIndex: 9999,
  }),
};
```

#### **2. React Select Dropdown Implementation**

```typescript
// Car Type dropdown example from Search page
<Select
  id="carType"
  instanceId="carType-select"
  value={carTypeOptions.find(opt => opt.value === searchFilters.carType) || null}
  onChange={(option) => handleSelectChange('carType', option)}
  options={carTypeOptions}
  styles={selectStyles}
  placeholder="All Types"
  isClearable={false}
  isSearchable={false}
  menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
  menuPosition="fixed"
  className="react-select-container"
  classNamePrefix="react-select"
/>

// Car selection dropdown from Reserve page
<Select
  id="carId"
  instanceId="carId-select"
  value={carOptions.find(opt => opt.value === formData.carId) || null}
  onChange={(option) => {
    const value = option?.value || '';
    setFormData(prev => ({ ...prev, carId: value }));
  }}
  options={carOptions}
  styles={selectStyles}
  placeholder="Select a Car"
  isClearable={false}
  isSearchable={false}
  menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
  menuPosition="fixed"
/>
```

#### **3. React DatePicker Custom CSS Styling**

```typescript
<style dangerouslySetInnerHTML={{__html: `
  /* Style react-datepicker with Tailwind */
  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 3rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: white;
    color: #111827;
    font-size: 1rem;
    transition: all 0.2s;
  }
  
  .react-datepicker__input-container input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .react-datepicker__header {
    background-color: #eff6ff;
    border-bottom: 1px solid #e5e7eb;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding-top: 0.75rem;
  }
  
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #3b82f6 !important;
    color: white !important;
    font-weight: 600;
  }
  
  .react-datepicker__day:hover {
    background-color: #dbeafe;
    border-radius: 0.375rem;
  }
`}} />
```

#### **4. DatePicker Component Implementation**

```typescript
<div className="relative">
  <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
    Pickup Date
  </label>
  <div className="relative">
    {/* Calendar icon */}
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <DatePicker
      id="pickupDate"
      selected={pickupDate}
      onChange={(date: Date | null) => {
        setPickupDate(date);
        setFormData(prev => ({ 
          ...prev, 
          pickupDate: date ? date.toISOString().split('T')[0] : '' 
        }));
      }}
      minDate={new Date()}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select pickup date"
      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg 
                 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                 transition-all duration-200 bg-white text-gray-900
                 hover:border-gray-300 shadow-sm hover:shadow-md
                 cursor-pointer"
      wrapperClassName="w-full"
    />
  </div>
</div>
```

#### **5. Form Input Styling with Tailwind CSS**

```typescript
<input
  type="text"
  id="name"
  name="name"
  placeholder="Enter your full name"
  value={formData.name}
  onChange={handleChange}
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
             transition-all duration-200 bg-white text-gray-900
             hover:border-gray-300 shadow-sm hover:shadow-md"
  required
/>
```

### **Testing**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Date picker displays calendar popup	| Click on pickup date field | Calendar popup appears with styled appearance | Calendar appears with blue-themed styling | PASS |
| Date picker enforces minimum date	 | Try to select past date | Past dates are disabled/grayed out | Past dates are disabled and cannot be selected | PASS |
| React Select dropdown styling | Click on car type dropdown | Dropdown opens with styled menu matching design system | Dropdown displays with blue accents and proper styling | PASS |
| Form input focus states | Click on any text input field | Input shows blue border and ring effect on focus | Input displays blue border and ring on focus | PASS |

**Verification:**  Khush

---

## 4. Testing Summary

| Story ID | Test Description | Method | Result | Verified By |
|----------|------------------|--------|--------|--------------|
| SEC-2 | Auth uses persistent user store | Manual UI test | Complete | Arjun |
| SYS-1 | Reservations/users load/save correctly | Manual | Complete | Sam |
| UI-7 | UI improvements applied consistently | Visual/manual | Complete | Connor |
| UI-8 | React & Tailwind CSS UI Implementation | Manual | Complete | Khush |
| SYS-2 | Features interact with shared persistent state | Manual | Complete | Team |


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
