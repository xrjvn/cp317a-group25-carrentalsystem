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
These features complete the basic customer lifecycle for booking usage — users can now manage, see, modify, and cancel their own past bookings.

---

## 2. Sprint Backlog

| Story ID | Story Title | Points | Priority | Assigned To | Tasks | Status |
|----------|-------------|--------|----------|-------------|-------|--------|
| UI-3 | Cancel Reservation | 3 | Medium | <NAME> | Implement remove reservation from mock DB | In Progress |
| UI-4 | View Rental History | 2 | Low | <NAME> | Show past rentals from mock DB | In Progress |
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

### Person X – UI-3 (Cancel Reservation)
**Overview:**  
(write notes here)

**Files Modified:**
- 

**Code Snippet:**  
```tsx
// fill code here
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



