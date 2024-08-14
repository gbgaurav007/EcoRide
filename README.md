## EcoRide

Ecoride is a carpooling website that allows users to search and book shared rides, making travel more eco-friendly and cost-effective. Drivers can also publish their rides after creating a verified driver profile. The project is built using React for the frontend, Node.js for the backend, and MongoDB as the database.

### Features

- User Authentication: Secure registration and login for users.
- Search & Book Rides: Users can search for shared rides and book them based on their preferences.
- Driver Profile: Drivers can create a verified profile and publish rides.
- Ride Management: Manage your published or booked rides from the dashboard.
- Responsive Design: Fully responsive design that works on all devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download) installed
- An account on [Cloudinary](https://cloudinary.com)

### Tech Stack

- **Frontend:**
  - React.js
  - JavaScript

- **Backend:**
  - Node.js
  - Express
  - MongoDB

### Installation

1. **Clone the Repository**

   ```bash
   https://github.com/gbgaurav007/EcoRide.git
   cd EcoRide
   ```

2. **Install Node Modules:**
    - Navigate to the `frontend` folder and install the dependencies:
      ```sh
      cd frontend
      npm install
      ```
    - Navigate to the `backend` folder and install the dependencies:
      ```sh
      cd ../backend
      npm install
      ```

### Running the application

1. **Setup Environment Variables:**
    - In the `backend` folder, create a file named `.env` and add all the environment variables as specified in `.sample.env`.

2. **Configure Database name:**
    - Navigate to the `backend/src/constants.js` file and update the `DB_NAME` file with the database name:
      ```js
        // your database name
      export const DB_NAME = "Eco-Ride";
      ```

3. **Start the Backend:**
    - In the `backend` folder, run the following command to start the backend server:
      ```sh
      npm run dev
      ```

4. **Start the Frontend:**
    - In the `frontend` folder, run the following command to start the frontend development server:
      ```sh
      npm start
      ```

5.	Open your browser and navigate to http://localhost:3000 to access the Ecoride website.

## Folder Structure

```plaintext
ecoride/
├── backend/                   # Backend folder
│   ├── .env                   # Environment variables
│   └── src/
│       ├── models/            # Mongoose models
│       ├── routes/            # Express routes
│       ├── controllers/       # Controllers for handling requests
│       ├── middlewares/       # Middlewares
│       ├── db/                # Connecting to database
│       ├── utils/             # Utility functions
│       ├── index.js           # Entry point for the backend
│       ├── app.js             # Express app setup
│       └── constants.js       # Defining constants like database name
│
└── frontend/                  # Frontend folder
    ├── public/                # Public assets
    ├── src/                   # React components and pages
    └── tailwind.config.js     # Tailwind CSS configuration file
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, bugs, or enhancements.
