# CP317A – Sprint 01
**Group 25 – Car Rental System**

---

## Cover Page
- **Course Code:** CP317A – Software Engineering
- **Project Title:** Car Rental System
- **Group ID:** Group 25
- **Product Owner / Scrum Master:** Arjun Singh
- **Developers:** Connor Davison, Hayden Gdanski, Khush Patel, Sam Oreskovic, Andrew Opris

---

## 1️⃣ Sprint Goal
Deliver the **first functional prototype** of the Car Rental System.

### Objectives
- Implement a **working login prototype** (Next.js) with mock authentication.  
- Develop a **car search page** using test data with filters for car type and dates.  
- Build a basic **reservation form** to simulate booking creation.  
- Establish a consistent **UI layout and navigation structure** for future sprints.

**Why these stories:**  
They form the foundation of the system — every later feature (modifications, reports, profiles) depends on users being able to log in, search for cars, and book a reservation.

---

## 2️⃣ Sprint Backlog
| Story ID | Story Title | Points | Priority | Assigned To | Tasks | Status |
|-----------|-------------|---------|-----------|--------------|--------|---------|
| SEC-1 | Secure Login | 8 | High | Arjun Singh | Implement Next.js login page with mock auth and validation | ✅ Completed |
| UI-1 | Search Cars | 5 | High | Connor Davison & Khush Patel | Create search form + results page with mock data | ⏳ In Progress |
| UI-2 | Reserve Car | 8 | High | Hayden Gdanski | Build booking form and temporary storage logic | ⏳ Not Started |

---

## 3️⃣ Implementation Progress

### ✅ Arjun Singh – SEC-1 (Secure Login)
**Overview:**  
Created a Next.js login prototype in `/app/login/page.tsx` to simulate basic authentication.  
The form validates user input and displays login status messages locally.  
No backend yet; future sprints will connect to Supabase.

**Files Modified:**  
- `/app/login/page.tsx` – Login component  
- `/app/globals.css` – Styling for form  
- `/app/api/auth/route.ts` – Placeholder for backend logic  

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
