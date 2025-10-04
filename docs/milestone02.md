# CP317A – Milestone 012 
**Group 25 – Car Rental System**  

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

## 1) Abstract
The **Car Rental System** project enables customers to search, reserve, and manage vehicle rentals through an intuitive interface, while giving managers tools to view daily activity and generate fleet-usage reports.  

This milestone expands on the previous deliverable by refining requirements, introducing a fully structured **Product Backlog**, defining **functional and non-functional requirements**, elaborating on **ethical considerations**, and presenting **initial UI design sketches** that visualize core interactions of the system.

---

## 2) Product Backlog (Expanded)
The initial backlog from Milestone 01 has been enhanced to include **Story Points, Priority, Sprint Assignment, Status, Conversation**, and **Confirmation (Acceptance Criteria)**.  
It is maintained in **`ProductBacklog.xlsx`** and summarized below.

### 🧩 Backlog Summary (Excerpt)
| Story ID | Story Title | Story Points | Priority | Sprint Assignment | Status |
|-----------|-------------|--------------|-----------|-------------------|---------|
| UI-1 | Search Cars | 5 | High | Sprint 1 | Not Started |
| UI-2 | Reserve Car | 8 | High | Sprint 1 | Not Started |
| SEC-1 | Secure Login | 8 | High | Sprint 1 | Not Started |
| UI-3 | Modify Reservation | 5 | Medium | Sprint 2 | Not Started |
| UI-4 | Cancel Reservation | 3 | Medium | Sprint 2 | Not Started |
| UI-6 | Account / Profile | 3 | Low | Sprint 2 | Not Started |
| REP-1 | Car Usage Report | 8 | High | Sprint 3 | Not Started |
| REP-2 | Daily Rentals Report | 5 | Medium | Sprint 3 | Not Started |
| UI-5 | View Rental History | 2 | Low | Sprint 3 | Not Started |

### 💡 Methodology Notes
- **Story Points:** Use Fibonacci scale (1, 2, 3, 5, 8, 13) to represent relative effort.  
- **Sprint Assignment:** Sprint 1 focuses on core customer features (search, reserve, login); Sprint 2 on modifications and profiles; Sprint 3 on manager reports.  
- **Conversation / Confirmation:** Provide notes and acceptance criteria for each story to align team understanding and testing criteria.  
- **Status:** Initially “Not Started” for all stories; to be updated in later milestones.  

The complete backlog with full user stories and details is included in the Excel file **`ProductBacklog.xlsx`**.

---

## 3) Requirements Refinement
### Functional Requirements (5–10)
1. **User Registration / Login:** System must support secure account creation and login with hashed credentials.  
2. **Car Search:** Customers must be able to filter available cars by type, date, and price.  
3. **Reservation Management:** Customers can reserve, cancel, or modify bookings through their dashboard.  
4. **Payment Processing:** Reservations require payment confirmation using secure methods (placeholder gateway for prototype).  
5. **Rental History:** Users must view past bookings and receipts.  
6. **Reporting Dashboard:** Managers can view daily rentals and generate usage reports.  
7. **User Roles & Access:** System must differentiate permissions between customers, managers, and admins.  
8. **Data Persistence:** All records stored in a relational database with unique IDs and referential integrity.  
9. **Session Handling:** Users remain logged in for a defined duration with timeout for inactivity.  
10. **Search Validation:** Date inputs and availability queries must be validated to prevent conflicts.

### Non-Functional Requirements (2–5)
1. **Performance:** System should return search results within 2 seconds for 1000+ entries.  
2. **Usability:** UI must be intuitive and accessible (contrast ratio ≥ 4.5:1, keyboard navigation).  
3. **Reliability:** Critical functions (e.g., booking) should achieve ≥ 99% success rate in testing.  
4. **Security:** Passwords hashed using SHA-256 (or better); data transmission secured via HTTPS.  
5. **Scalability:** Architecture should support future integration with third-party APIs (e.g., payment or GPS services).  

---

## 4) Ethical Considerations (Updated)
Ethical principles from Milestone 01 were expanded to address the system’s growing scope:  

1. **Data Privacy & Security:** Customer data must be stored with encryption, and access restricted by role. Backups are protected and anonymized.  
2. **Fairness & Transparency:** Pricing and availability algorithms will not favor specific users or locations. All users see the same offers under identical criteria.  
3. **Accessibility:** The interface will be tested against WCAG guidelines to ensure users with visual or motor impairments can interact easily.  
4. **Data Retention Policy:** Customer records are retained only as long as legally necessary and then securely deleted.  
5. **User Consent:** All data collection points (e.g., account creation) will include explicit consent language.  

---

## 5) Initial Design Sketches
*(For submission, attach or embed sketches below. They may be hand-drawn and scanned or created digitally.)*  

**Main Screens to Include:**
1. **Login Screen:** Username + password fields and “Forgot Password” option.  
2. **Customer Dashboard:** Search bar, filters (car type/date), and list of available cars.  
3. **Reservation Form:** Pickup/return dates, vehicle details, payment section.  
4. **Manager Dashboard:** Summary cards for daily rentals and fleet utilization.  
5. **Reports Screen:** Graphs showing popular car types and rental trends.  

Include arrows or labels indicating navigation flow between screens. Screenshots or images can be attached as appendix pages in the PDF.  

---

## 6) Team Blog (Update)
The team continues to use the Excel Blog file (**`Group25-Blog.xlsx`**) to track weekly activities, meetings, and individual contributions.  
New entries since Milestone 01 reflect time spent on requirement refinement, backlog expansion, and design sketch development.  

---

## 7) Submission Checklist
Before submitting Milestone 02, ensure the following files are uploaded to MyLearningSpace:  
- ✅ `Group25-Milestone02.pdf` (this document)  
- ✅ `ProductBacklog.xlsx` (expanded backlog)  
- ✅ `Group25-Blog.xlsx` (updated blog)  

**Deadline:** Sunday, October 12, 2025 @ 11:59 PM.  

---
