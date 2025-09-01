# Event Management System

This project is a web application designed for managing event reservations. It provides a platform for users to register, log in, and view their reservations on a personal dashboard. The application is built using React, TypeScript, and Vite.

## Screens / Pages

The project currently includes the following main screens:

- **Login Page**: `/login` - Allows existing users to authenticate and access their dashboard.
- **Register Page**: `/register` - Allows new users to create an account.
- **Dashboard Page**: `/dashboard` - A protected route, accessible only to authenticated users, where they can view and manage their event reservations.
- **Not Found Page**: A 404 page is configured to handle any requests to non-existent routes.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/silvadouglasFull/eventManagementWeb
    ```
2.  Navigate to the project directory:
    ```sh
    cd eventManagementWeb
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

This will start the application on a local development server. Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal) to see the application.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the source code using ESLint to find and fix problems.
