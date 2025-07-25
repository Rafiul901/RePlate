# 🥗 RePlate - Surplus Food Donation Platform

RePlate is a full-stack web platform that connects restaurants with surplus food to verified charities and individuals in need. The system ensures transparency, accountability, and ease of use for all stakeholders involved in food donation and redistribution.

---

## 🔑 Admin Credentials (For Demo Purposes)

- **Username:** flame@fire.com  
- **Password:** 1234Aa

> 🔒 Note: Please change admin credentials in production!

---

## 🌐 Live Site

[Visit RePlate Live 🌍](https://replate11.netlify.app/)

---

## ✨ Key Features

1. **Role-Based Authentication System**
   - Supports Charity, Restaurant, Admin, and User roles.
   - Role approvals managed by Admin with secure workflow.

2. **Restaurant Dashboard**
   - Add, edit, and track surplus food donations.
   - Upload food images and specify pickup windows.
   - Donations default to **Pending** status until approved.

3. **Charity Dashboard**
   - View and request available surplus food.
   - Manage donation requests and see status updates.
   - View donation history and transaction records.

4. **Admin Panel**
   - Approve/Reject new Charity and Restaurant signups.
   - View all donation and transaction logs.
   - Manage reported users and flagged donations.

5. **Donation History System**
   - Each donation is saved with status (Pending, Accepted, Collected, Rejected).
   - History viewable by both donating restaurant and receiving charity.

6. **Image Upload Support**
   - Food images are uploaded from local device and stored with each donation.

7. **Location-Aware Listings**
   - Donation listings include address and GPS coordinates for pickup logistics.

8. **Email-Verified User Signup**
   - Ensures all user accounts are linked to valid email addresses.

9. **Secure Session Handling**
   - JWT or token-based authentication used for session management.

10. **Responsive Design**
    - Fully mobile-friendly UI for restaurants and charities on the go.

11. **Surplus Tracking**
    - Restaurants can track how much food they've donated over time.

12. **Donation Status Notifications**
    - Users get notified of status changes in real-time (e.g., “Your request was accepted”).

13. **Approval Workflow**
    - Admin must approve all charity and restaurant accounts to maintain trust.

14. **Fast Search & Filtering**
    - Charities can filter available food by type, quantity, and pickup time.

15. **MongoDB-Backed Data Storage**
    - Scalable document-based storage with optimized queries for dashboard performance.

16. **SweetAlert2 for UI Interactions**
    - Enhanced user feedback using styled alert modals.

17. **Reusable Components with React**
    - Code is clean, reusable, and follows component-driven structure.

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** Context API 
- **Deployment:** Netlify (Frontend), Vercel  (Backend)
- **Image Hosting:** Cloudinary / Local Server

---

## 🧪 Test Instructions

1. Visit the live site.
2. Log in as admin using the credentials above.
3. Approve a few restaurant/charity accounts.
4. Try submitting a donation from a restaurant.
5. Log in as charity and request the donation.
6. Review donation history and status updates.

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to contribute, fork the repo and submit your PR. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📩 Contact

For questions or feedback, email us at: `support@replate.com`

---

