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
- [MongoDB](https://www.mongodb.com/try/download) installed 
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
    - In the backend and frontend folders, create a file named `.env` and add the necessary variables (refer to the [Environment Variables](#environment-variables) section).

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


## Environment Variables

Create a .env file inside the backend directory with the following variables:

```plaintext
PORT=8000                                         # The port on which the backend server will run
MONGODB_URL=your_mongodb_uri                      # The MongoDB connection string
CORS_ORIGIN=*                                     # The origin allowed for CORS requests (adjust as necessary)

ACCESS_TOKEN_SECRET=your_access_token_secret      # Secret key for access token JWT
ACCESS_TOKEN_EXPIRY=1d                            # Access token expiry time

REFRESH_TOKEN_SECRET=your_refresh_token_secret    # Secret key for refresh token JWT
REFRESH_TOKEN_EXPIRY=10d                          # Refresh token expiry time

CLOUDINARY_CLOUD_NAME=your_cloudinary_name        # Cloudinary cloud name
CLOUDINARY_CLOUD_KEY=your_cloudinary_key          # Cloudinary API key
CLOUDINARY_CLOUD_SECRET=your_cloudinary_secret    # Cloudinary API secret
```

- PORT: The port on which the backend server will run.
- MONGODB_URL: The MongoDB connection string.
- CORS_ORIGIN: The origin allowed for CORS requests (set to * to allow all origins, but it’s recommended to restrict it in production).
- ACCESS_TOKEN_SECRET: A secret key for signing access token JWTs.
- ACCESS_TOKEN_EXPIRY: Expiration time for access tokens (e.g., 1h for 1 hour or 1d for 1 day).
- REFRESH_TOKEN_EXPIRY: Expiration time for refresh tokens (e.g., 10d for 10 days).
- CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name for image storage.
- CLOUDINARY_CLOUD_KEY: Your Cloudinary API key.
- CLOUDINARY_CLOUD_SECRET: Your Cloudinary API secret.

Similarly, create a .env file inside the frontend directory with the following variable:

```plaintext
REACT_APP_BACKEND_URL=your_backend_url            # The url on which backend application will run
```

> [!NOTE]
> If running on localhost, set the backend url as http://localhost:8000

## Folder Structure

```plaintext
ecoride/
├── backend/                   # Backend folder
│   ├── .env                   # Environment variables
│   └── src/
│       ├── models/            # Mongoose models
│       ├── routes/            # Express routes
│       ├── controllers/       # Controllers for handling requests
│       ├── middlewares/       # Custom Middlewares
│       ├── db/                # Connecting to database
│       ├── utils/             # Utility functions
│       ├── index.js           # Entry point for the backend
│       ├── app.js             # Express app setup
│       └── constants.js       # Defining constants like database name
│
└── frontend/                  # Frontend folder
    ├── .env                   # Environment variables
    ├── public/                # Public assets and images
    ├── src/                   # React components and pages
    │   ├── components/        # Reusable components
    │   ├── pages/             # Main project pages
    │   ├── data/              # Sample/static data files
    │   └── context/           # Context providers
    ├── App.js                 # Main Application file
    └── tailwind.config.js     # Tailwind CSS configuration file
```


## Deployed Website

The EcoRide application has been deployed on Vercel. It can be accessed through the following url: https://eco-ride.vercel.app

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, bugs, or enhancements.




