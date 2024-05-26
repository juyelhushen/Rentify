# Rentify

## Overview

Rentify is a web application designed to streamline property rental management. The application features a robust frontend built with Angular 17 and a powerful backend developed with Spring Boot using Java 17. AWS S3 is utilized for storage needs, and MySQL serves as the database for persisting data. The frontend runs on port 4200, while the backend operates on port 8081.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Configuration](#database-configuration)
- [AWS S3 Configuration](#aws-s3-configuration)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Property listing management
- Tenant management
- Lease management
- Payment tracking
- Notifications and alerts

## Installation

To get a local copy up and running, follow these steps.

### Prerequisites

- Java 17
- Node.js
- Angular CLI
- MySQL
- AWS account for S3

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/rentify.git
    ```

2. Navigate to the backend directory:
    ```sh
    cd rentify/backend
    ```

3. Build the backend:
    ```sh
    ./mvnw clean install
    ```

4. Run the Spring Boot application:
    ```sh
    ./mvnw spring-boot:run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd rentify/frontend
    ```

2. Install npm packages:
    ```sh
    npm install
    ```

3. Start the Angular application:
    ```sh
    ng serve
    ```

## Database Configuration

1. Ensure MySQL is installed and running.
2. Create a database named `rentify`.
3. Update the `application.properties` file in the backend with your database credentials:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/rentify
    spring.datasource.username=yourusername
    spring.datasource.password=yourpassword
    spring.jpa.hibernate.ddl-auto=update
    ```

## AWS S3 Configuration

1. Create an S3 bucket on your AWS account.
2. Update the `application.properties` file in the backend with your S3 bucket details:
    ```properties
    cloud.aws.s3.bucket=your-bucket-name
    cloud.aws.credentials.accessKey=your-access-key
    cloud.aws.credentials.secretKey=your-secret-key
    ```

## Running the Application

1. Ensure the backend server is running on `http://localhost:8081`.
2. Ensure the frontend server is running on `http://localhost:4200`.
3. Access the application by navigating to `http://localhost:4200` in your web browser.

## Technologies Used

- **Frontend:** Angular 17
- **Backend:** Spring Boot, Java 17
- **Storage:** AWS S3
- **Database:** MySQL

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Note:** This is a sample README file created for the Rentify project. Make sure to customize it further as per your project's specific needs.
