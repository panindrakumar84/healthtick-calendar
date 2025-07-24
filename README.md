# HealthTick Calendar

A modern, real-time calendar booking system designed for health coaches. This application provides an intuitive single-day view for managing appointments, with a clean UI and robust backend logic powered by Firebase.

Deployed Link: `https://healthtick-calendar-seven.vercel.app/`

---

## Key Features

*   **Single-Day Timeline View**: A clean, single-column, scrollable interface to view the day's schedule.
*   **Real-Time Booking**: Create, view, and delete appointments with instant updates from Firestore.
*   **Two Call Types**:
    *   **Onboarding Calls**: 40-minute sessions that visually span two time slots.
    *   **Follow-up Calls**: 20-minute sessions that can be made recurring.
*   **Recurring Appointments**: Book follow-up calls that repeat weekly on the selected day of the week.
*   **Intelligent Scheduling Logic**:
    *   Prevents booking appointments in past time slots.
    *   Recurring series only appear on or after their designated start date.
    *   Robust overlap detection to prevent double-booking.
*   **Client Management**: A searchable dropdown to easily find and select clients for bookings.
*   **Polished User Interface**:
    *   Modern, professional color palette.
    *   A sleek, custom-styled scrollbar for a minimalist feel.
    *   Responsive design that works on desktop and mobile.
*   **User Feedback**: Integrated `sonner` toast notifications for success and error messages.

---
## Future Updates

This project has a solid foundation, but there's always room to grow. Here are some potential features planned for the future:

*   **Edit Bookings**: Allow existing appointments to be updated.
*   **End Dates for Recurring Series**: Add an optional 'end date' to recurring follow-up calls to automatically stop the series.
the registered coach can manage their calendar.
*   **Email Notifications**: Automatically send confirmation emails to the coach (and client) when a booking is created or cancelled.



## Tech Stack

*   **Frontend**: React, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Database**: Firebase (Firestore)
*   **Notifications**: Sonner
*   **Date Management**: `date-fns` & `react-day-picker`

---

## Firebase Data Model

The application uses two main collections in Firestore to store data.
1. Clients Collection
    ```json
    {
    "id": "string",
    "name": "string",
    "phone": "string"
    }
    ```
2. Bookings Collection
- One-Time Booking Model (Onboarding)
    ```json
    {
    "id": "string"
    "clientId": "string",
    "type": "string",
    "startTime": "string",
    "durationMins": "number",
    "isRecurring": "boolean",
    "date": "string"
    }
    ```
- Recurring Booking Model (Follow-up)
    ```json
    {
    "id": "string"
    "clientId": "string",
    "type": "string",
    "startTime": "string",
    "durationMins": "number",
    "isRecurring": "boolean",
    "startDate": "string",
    "recurrence": {
        "freq": "string",
        "day": "string"
        "endDate": "string"
    }
    }
    ```



## Getting Started

Follow these steps to get the project running locally.

### 1. Clone the Repository

```
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add your Firebase project configuration. **Remember to use the `VITE_` prefix.**

```
# .env

VITE_FIREBASE_API_KEY="your_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
```

### 4. Run the Development Server

```
npm run dev
```

The application should now be running on `http://localhost:5173`