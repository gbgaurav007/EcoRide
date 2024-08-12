## Setup Instructions

### Prerequisites

- Node.js and npm installed

### Tech Stack

- **Frontend:**
  - ReactJS
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
   
   ## Installation Steps

1. **Install Node Modules:**
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

2. **Setup Environment Variables:**
    - In the `backend` folder, create a file named `.env` and add all the environment variables as specified in `.sample.env`.

3. **Configure Frontend Base URL:**
    - Navigate to the `frontend/src/utils` folder and update the `axiosInstance` file with the correct base URL:
      ```js
        // your api url
      export const baseURL = "http://localhost:3000/";
      ```

4. **Start the Backend:**
    - In the `backend` folder, run the following command to start the backend server:
      ```sh
      npm run dev
      ```

5. **Start the Frontend:**
    - In the `frontend` folder, run the following command to start the frontend development server:
      ```sh
      npm start
      ```

