# CP317A – Sprint 02  
**Group 25 – Car Rental System**

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
| UI-3 | Cancel Reservation | 3 | Medium | <TEAM MEMBER NAME> | Implement remove reservation from mock DB | In Progress |
| UI-4 | View Rental History | 2 | Low | <TEAM MEMBER NAME> | Show past rentals from mock DB | In Progress |
| UI-5 | Modify Reservation | 5 | Medium | <TEAM MEMBER NAME> | Update reservation record in mock DB | In Progress |
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
// (Arjun already committed in repo)
