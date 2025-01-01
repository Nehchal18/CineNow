# CineNow - Real-Time Movie Ticket Booking Application

## Overview
CineNow is a state-of-the-art movie ticket booking application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform offers an intuitive and user-friendly experience to browse movies, view seat availability, and book tickets in real-time. Its responsive design ensures seamless functionality across various devices.

---

## Features
- **User Authentication:** Secure login and registration using JWT.
- **Real-Time Seat Availability:** Dynamic seat maps for each showtime.
- **Booking Management:** Create, view, and manage ticket bookings.
- **Admin Panel:** Add movies, view bookings, and manage users.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Secure Transactions:** Password encryption and HTTPS support.

---

## Tech Stack
- **Frontend:** React.js with Redux for state management.
- **Backend:** Node.js with Express.js.
- **Database:** MongoDB Atlas for persistent data storage.
- **Authentication:** JSON Web Tokens (JWT).
- **Other Tools:**
  - Styled-components for consistent styling.
  - Mongoose for Object Data Modeling (ODM).
  - Bcrypt for secure password hashing.

---

## Installation and Setup

### Prerequisites
Ensure the following are installed:
- Node.js
- npm or yarn
- MongoDB (local or MongoDB Atlas connection)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cinenow.git
   cd cinenow
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:3000`.

---


## Database Schema
### Users
- **name:** Full name of the user.
- **username:** Unique username (lowercase).
- **email:** Email address (unique).
- **password:** Encrypted password.
- **bookings:** List of booking references.

### Movies
- **title:** Movie title.
- **description:** Brief description of the movie.
- **actors:** List of actors.
- **releaseDate:** Movie release date.
- **posterUrl:** URL to the movie poster.
- **featured:** Featured status of the movie.
- **bookings:** List of associated bookings.
- **admin:** Reference to the admin who added the movie.

### Bookings
- **movie:** Reference to the booked movie.
- **date:** Booking date.
- **seatNumber:** Reserved seat number.
- **user:** Reference to the user.

### Admins
- **email:** Admin’s email address.
- **password:** Admin’s password.
- **addedMovies:** List of movies added by the admin.

---

## Deployment
- **Frontend:** Deployed on Vercel.
- **Backend:** Hosted on AWS.
- **Database:** Managed on MongoDB Atlas.


---

## Future Enhancements
- **WebSocket Integration:** Real-time seat updates.
- **Payment Gateway:** Seamless online transactions.
- **PWA Support:** Offline access for better usability.
- **Analytics:** User behavior and insights.

---

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License
CineNow is licensed under the MIT License. See `LICENSE` for details.

---

## Contact
For queries or feedback, reach out to [niharikakapoor864@gmail.com].

