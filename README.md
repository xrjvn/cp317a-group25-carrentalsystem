# CP317A – Group 25 Car Rental System

Final Group Project for **CP317A – Software Engineering**

This web application simulates a modern **Car Rental System** allowing users to browse available vehicles, create reservations, manage their profiles, and track their bookings. The project was developed over multiple milestones and sprints using an agile workflow.

---

## Team Members

- Arjun Singh  
- Connor Davison  
- Hayden Gdanski  
- Khush Patel  
- Sam Oreskovic  
- Andrew Opris  

---

## Final Project Overview

By the end of Sprint 03, the system supports a complete rental workflow:

- Browsing vehicles with filters
- Selecting rental dates
- Preventing overlapping double bookings
- Secure account sign-up and login
- Session persistence across page refresh
- Profile editing with saved data
- Checkout confirmation before booking
- Reservation viewing and cancellation
- UI autofill for logged-in users
- Modern styling using **Tailwind CSS**, **React Select**, and **DatePicker**

User accounts are persisted using **localStorage**, while reservations are saved through **JSON API routes**, ensuring system data remains consistent across runs.

---

## Repository Structure
```
/app       → App source code
/docs      → All milestones, sprints, final reports, PDFs
/backlog   → Product backlog planning documents
/blog      → Team contribution logs (Excel)
```

---

## Setup Instructions

Follow these steps to run the application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/xrjvn/cp317a-group25-carrentalsystem.git
cd cp317a-group25-carrentalsystem
   ```

2. **Install dependencies:**
   - Navigate to the `app` directory and install Node packages:
     ```
     cd app
     npm install
     ```

3. **Run the development server:**
   Once running, open the provided local URL in your browser http://localhost:3000

# Environment Requirements

- **Node.js** (v18 or newer)
- **npm** (comes with Node.js)
- Windows, macOS, or Linux
No external databases or servers are required.

---

## How To Use The Application

### Create an Account

1. Navigate to the **Sign-Up** page.  
2. Enter:
   - Name  
   - Email  
   - Password  
   - Driver’s license number  
3. Submit the form.

Your account is immediately available and persists across sessions.

---

### Log In

1. Navigate to the **Login** page.  
2. Enter your registered email and password.  
3. Upon success, you are redirected to the **Profile** page.  
4. Your login session stays active after refresh.

---

### Browse and Reserve a Car

1. Use the **Search** page to browse vehicles.  
2. Select pickup and return dates.  
3. Choose your desired vehicle.  
4. Complete the reservation form:
   - Name and email autofill if logged in.  
5. Continue to **Checkout** to confirm.

*If the selected dates conflict with an existing reservation for the same car, booking will be blocked.*

---

### Review Reservations

- Visit the **My Reservations** page to view all active reservations.  
- Reservations can be cancelled directly from this page.

---

### Edit Profile

- Navigate to **Profile** and edit name, email, or license data.  
- Click **Save Changes**.  
- Changes persist locally.

---

### Sign Out

- Use the **Sign Out** button from the Profile page.  
- This clears the active session and redirects to login.

---

## Testing Accounts

Test users can be created using the **Sign-Up** page.  
No default test credentials are provided — accounts may be created freely during testing.

---

## Repository Notes

- **User accounts:** Stored via `localStorage`  
- **Reservations:** Saved via JSON API routes  
- **State management:** React Context  
- **UI:** React, Tailwind CSS, React Select, DatePicker
