# Event Management Platform

## Overview
The Event Management Platform is a full-stack web application that allows users to create, manage, and attend events. It includes features such as user authentication, event creation, attendee management, filtering, and real-time updates.

## Tech Stack
### **Frontend:**
- **React.js** - For building the user interface.
- **React Router** - For client-side routing.
- **Axios** - For API requests.
- **CSS & Tailwind** - For styling.

### **Backend:**
- **Express.js** - Node.js framework for handling API requests.
- **Sequelize** - ORM for database interactions.
- **PostgreSQL** - Database for storing events and user data.
- **Supabase** - Used for authentication.
- **WebSockets** - For real-time updates (to be implemented).

<!-- ### **Deployment & Hosting:**
- **Frontend:** Vercel / Netlify (Free-tier hosting).
- **Backend:** Render / Railway (Free-tier hosting).
- **Database:** Supabase / PostgreSQL (Free-tier).

--- -->

## Features
### **User Authentication**
- Register/Login functionality.
- JWT-based authentication.
- User sessions persisted on the frontend.

### **Event Management**
- Create, edit, and delete events.
- Categorization of events (e.g., Workshop, Webinar, Meetup).
- Filter events by status (Upcoming, Completed) and date range.

### **Attendee Management**
- Users can RSVP to events.
- Display list of attendees for each event.
- Show attendee details (name) on event pages.

### **Real-Time Updates**
- Implement WebSockets to update attendee lists dynamically.

---

## Installation & Setup
### **1. Clone the Repository**
```bash
git clone https://github.com/Shradha-2491/Event-Management.git
cd event-management
```

### **2. Setup Backend**
```bash
cd server
npm install
```

#### **2.1 Configure Environment Variables**
Create a `.env` file in the `server` directory and add:
```env
PORT=your_port
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

#### **2.2 Run Backend**
```bash
npm start
```

### **3. Setup Frontend**
```bash
cd ../client
npm install
npm start
```

---

## API Endpoints
### **Auth Routes**
| Method | Endpoint | Description |
|--------|------------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |

### **Event Routes**
| Method | Endpoint | Description |
|--------|------------|-------------|
| GET | `/api/event` | Fetch all events (with filters) |
| POST | `/api/event` | Create a new event |
| GET | `/api/event/:id` | Get details of a specific event |
| PUT | `/api/event/:id` | Update an event |
| DELETE | `/api/event/:id` | Delete an event |

### **Attendee Routes**
| Method | Endpoint | Description |
|--------|------------|-------------|
| GET | `/api/attendee/user/:userId` | Get all events for an user |
| GET | `/api/attendee/event/:eventId` | Get all Attendee for an event |
| POST | `/api/attendee` | Add an attendee to an event |

---

<!-- ## Deployment
### **Frontend (Vercel/Netlify)**
- Connect your GitHub repository.
- Set up environment variables in the Vercel/Netlify dashboard.
- Deploy automatically on push.

### **Backend (Render/Railway)**
- Deploy via GitHub repository.
- Configure environment variables.
- Ensure PostgreSQL database is accessible.

--- -->

## Future Development can be
- **Payment Integration** for ticketed events.
- **Google Calendar Sync** to integrate events with user calendars.

---



