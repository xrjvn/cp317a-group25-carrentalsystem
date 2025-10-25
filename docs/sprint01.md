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
Created a Next.js login prototype in `/app/login/page.tsx` to simulate basic authentication.
The form validates user input and displays login status messages locally.
No backend yet; future sprints will take that on.

**Files Modified:**  
- `/app/login/page.tsx` – Login component
- `/app/globals.css` – Styling for form
- `/app/api/auth/route.ts` – Placeholder for backend logic

**Code Snippet:**
(/CODE GOES HERE/)


### Person 2 & Person 3 – UI-1 (Search Cars)
**Overview:**
(Write a few sentences about progress here, like how you built or mocked the car search feature using static JSON data or sample car listings.)

**Files Modified:**
(List the main file paths, e.g. /app/search/page.tsx.)

**Code Snippet:**
(/CODE GOES HERE/)


### Person 4 & Person 5 – UI-2 (Reserve Car)
**Overview:**
(Describe what you implemented or mocked for the reservation system, like booking form, date validation, temporary array to store reservations.)

**Files Modified:**
(List relevant Next.js files like /app/reserve/page.tsx.)

**Code Snippet:**
(/CODE GOES HERE/)


### Person 6 – Testing & Review

**Overview:**
(Summarize your role testing the implementations features, what you verified, what worked, and any issues found.)

**Testing Notes:**
| Feature | Tested By | Result | Comments |
|-----------|-------------|---------|-----------|
| SEC-1 | Person 6 | Pass or Fail or Pending |  |
| UI-1 | Person 6 | Pass or Fail or Pending |  |
| UI-2 | Person 6 | Pass or Fail or Pending |  |













