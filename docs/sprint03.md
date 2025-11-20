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
This sprint focuses on improving the stability and long-term usability of the system. In Sprint 02 we completed the full reservation lifecycle, but all data was stored in temporary mock memory. Sprint 03 moves toward real persistence, improves state reliability across pages, and tightens the UI design so the application feels unified.  

### Objectives  
- Implement simple file-based persistence for users and reservations
- Ensure all reservation actions (add, cancel, modify) update the persistent store
- Connect login and sign-up pages to stored user accounts
- Link the Profile page to stored user information
- Apply UI consistency fixes across major screens

### Why these stories  
This sprint transitions the project from a prototype to a system that actually remembers users and reservations. Persistence is required before we can build reports, manager views, or anything that relies on stored data. UI consistency was also needed because the number of screens increased and the project began to feel disjointed. Completing these tasks sets us up for Sprint 04 where reporting tools will be built on top of the data saved this sprint.

---

## 2. Sprint Backlog

| Story ID | Story Title | Points | Priority | Assigned To | Tasks | Status |
|----------|-------------|--------|----------|-------------|-------|--------|
| SYS-1 | Persistent File Store | 5 | High | **PersonX** | Load/save system for reservations & users | *In Progress* |
| SEC-2 | Login and Sign Up (persistent) | 5 | High | **Arjun** | Connect login & signup & profile to stored data | *In Progress* |
| UI-7 | UI Cleanup + Layout Improvements | 3 | Medium | **PersonX** | Improve layout, buttons, spacing, card styling | *In Progress* |
| SYS-2 | System-Wide Integration (Sprint Requirement) | 3 | High | **Everyone** | Ensure all features interact with shared persistent state | Ongoing |

---

## 3. Implementation Progress

## **Sprint Integration Summary (Required for Sprint 03)**
This sprint introduced our first real persistent data layer. Instead of using mock data that resets on every refresh, the system now stores users and reservations in a file. This required updating login, profile, reservation creation, and reservation management so they all read from and write to the same shared source. Because of this, all pages now stay synchronized and changes made in one area immediately show up across the system.  

This was the first sprint where the team had to coordinate how features interact with each other instead of just building isolated UI screens. The shared persistence and state management made the system feel more cohesive and closer to a real rental platform.

---

## **Arjun Singh – SEC-2 (Persistent Login + Sign-Up + Profile)**

### **Overview**
My main task this sprint was to connect authentication and the Profile page to our new persistent data system. Previously, login/sign-up worked using mock objects that reset when the page refreshed. In this sprint, users can register, log in, and update their profile, and all changes are saved permanently into the new file-based storage.

### **Files Modified**
- `/src/app/login/page.tsx`  
- `/src/app/signup/page.tsx`  
- `/src/app/profile/page.tsx`  
- `/src/lib/persistence.ts` (integrated user storage logic)

### **Key Work Completed**
- Implemented a working Sign-Up page that writes new user accounts to the persistent file  
- Updated Login page to authenticate against stored credentials  
- Connected Profile page to load and update the stored user object  
- Ensured all changes remain after reload (persistent write-back)  
- Cleaned up UI spacing and button styling for auth-related pages  

### **Testing**
| Case | Input | Expected Result | Actual Result | Result |
|------|--------|-----------------|----------------|--------|
| Create new account | Email, password, license | New user added to persistent store | Saved correctly | PASS |
| Login with existing user | Valid credentials | User logged in & redirected | Correct | PASS |
| Update profile | Change name/email/license | Stored user object updated | Persistent update succeeded | PASS |
| App reload | Refresh page | User info remains | Data persisted | PASS |

**Verification:** Arjun  

---

## **PersonX – SYS-1 Persistent File Store**  
*(PLACEHOLDER – fill this in)*  
Write:  
- Overview  
- Files Modified  
- Implementation Details  
- Testing Table  

---

## **PersonX – UI-7 UI Cleanup & Layout Improvements**  
*(PLACEHOLDER – fill this in)*  

---

## **PersonX – Integration Testing & Reservation UI Adjustments**  
*(PLACEHOLDER – fill this in)*  

---

## **PersonX – Modify Reservation polishing for persistence compatibility**  
*(PLACEHOLDER – fill this in)*  

---

## **PersonX – System Integration / Error Handling**  
*(PLACEHOLDER – fill this in)*  

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
Each group member has updated **Group25-Blog.xlsx** with hours and tasks.

---

## **7. Submission Checklist**
- `Group25-Sprint03.pdf`
- `Group25-ProductBacklog.xlsx` (updated)  
- `Group25-Blog.xlsx` (updated)  
- 1–3 minute demo video showing the new persistence + login/profile flow  

**Deadline:** Sunday, November 16th, 2025 @ 11:59 PM
