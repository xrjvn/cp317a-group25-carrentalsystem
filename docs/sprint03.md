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
| SYS-1 | Persistent File Store | 5 | High | **PersonX** | Load/save system for reservations & users | *In Progress* |
| SEC-2 | Login and Sign Up (persistent) | 5 | High | **Arjun** | Connect login & signup & profile to stored data | *In Progress* |
| UI-7 | UI Cleanup + Layout Improvements | 3 | Medium | **Connor** | Improve layout, buttons, spacing, card styling | *In Progress* |
| SYS-2 | System-Wide Integration (Sprint Requirement) | 3 | High | **Everyone** | Ensure all features interact with shared persistent state | Ongoing |

---

## 3. Implementation Progress

## **Sprint Integration Summary**
This sprint introduced our first real persistent data system. Instead of relying on mock data that resets on every refresh, the app can now save and load users and reservations from storage. Because of this, login, sign-up, profile editing, and reservation features now share one consistent source of truth.  

This also made Sprint 03 the first sprint where each feature had to work with others instead of standing alone. Changes made on one page now have to show up on all the others, which required more coordination within the team. The result is a system that behaves much more like a real rental platform, with data that stays consistent as the user moves between pages

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
All members updated **Group25-Blog.xlsx** with hours and tasks.

---

## **7. Submission Checklist**
- `Group25-Sprint03.pdf`
- `Group25-ProductBacklog.xlsx` (updated)  
- `Group25-Blog.xlsx` (updated)  
- 1–3 minute demo video

**Deadline:** Sunday, November 16th, 2025 @ 11:59 PM
