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
| SEC-1 | Secure Login | 8 | High | Arjun Singh | Implement login page with mock auth and validation | In Progress |
| UI-1 | Search Cars | 5 | High | Person 2 & Person 3 | Create search form + results page with mock data | In Progress |
| UI-2 | Reserve Car | 8 | High | Person 4 & Person 5 | Build booking form and temporary storage logic | In Progress |

---

## 3. Implementation Progress

### Arjun Singh – SEC-1 (Secure Login)
**Overview:**
Created a login prototype in `/app/login/page.tsx` to simulate basic authentication.
The form validates user input and displays login status messages locally.
No backend yet; future sprints will take that on.

**Files Modified:**  
- `/app/login/page.tsx` – Login component

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

### Person 4 & Person 5 – UI-2 (Reserve Car)
**Overview:**
(Describe what you implemented or mocked for the reservation system, like booking form, date validation, temporary array to store reservations.)

**Files Modified:**
(List relevant Next.js files like /app/reserve/page.tsx.)

**Code Snippet:**
(/CODE GOES HERE/)

---

### Person 6 – Testing & Review

**Overview:**
(Summarize your role testing the implementations features, what you verified, what worked, and any issues found.)

**Testing Notes:**
| Feature | Tested By | Result | Comments |
|-----------|-------------|---------|-----------|
| SEC-1 | Person 6 | Pass or Fail or Pending |  |
| UI-1 | Person 6 | Pass or Fail or Pending |  |
| UI-2 | Person 6 | Pass or Fail or Pending |  |

---

## **4. OVERALL Testing & Review**
| Story ID | Test Description | Method | Result | Verified By |
|-----------|------------------|---------|---------|--------------|
| SEC-1 | Login accepts valid credentials | Manual UI test | Pending | TBD |
| UI-1 | Search returns cars by filter | Manual UI test | Pending | TBD |
| UI-2 | Reservation stores temporary booking | Manual UI test | Pending | TBD |

---

## **5. Sprint Review & Reflection**
**Completed:**  
- /
- /
- /

**Next Sprint:**  
- Add real database connections
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
