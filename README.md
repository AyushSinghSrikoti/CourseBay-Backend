# CourseBay Backend

Welcome to the CourseBay backend repository. This repository contains the server-side code for the CourseBay platform, providing APIs for course management, user authentication, and reviews.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## About
The backend for CourseBay is designed to handle course data, user authentication, and reviews. It provides RESTful APIs for interacting with the frontend.

## Features
- **User Authentication**: Secure login and registration for users.
- **Course Management**: APIs for creating, updating, and deleting courses.
- **Review System**: APIs for submitting and retrieving course reviews and ratings.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: PassportJS
- **Hosting**: Onrender

## Installation
To get a local copy up and running, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/AyushSinghSrikoti/CourseBay-backend.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd CourseBay-backend
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up environment variables:**
    Create a `.env` file in the root directory and add your configuration variables:
    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    PORT=your desired port
    ```
5. **Start the server:**
    ```bash
    npm start
    ```

## Usage
The backend server runs on `http://localhost:8000` by default. You can interact with the APIs using tools like Postman or integrate with the frontend.

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Contact
- **Project Link**: [https://github.com/AyushSinghSrikoti/CourseBay-backend](https://github.com/AyushSinghSrikoti/CourseBay-backend)
- **Email**: [ayushsinghsrikoti@gmail.com](mailto:ayushsinghsrikoti@gmail.com)
- **Website**: [https://thriving-semolina-bd662b.netlify.app/](https://thriving-semolina-bd662b.netlify.app/)
