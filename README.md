# Stripe Payment Application

This project is a simple payment application that uses Stripe to process payments. It is built using React and Node.js.

## Project Structure

The project is divided into two main folders:

- `frontend`: This folder contains the React application.
- `node`: This folder contains the Node.js server.

## Available Scripts

## Setting Up Environment Variables

Before running the application, you need to set up the environment variables. You can use key from .env.sample file. A `.env.sample` file is provided in the `node` and `frontend` directory as a template. You can create a `.env` file from this template with the following command:

```bash
cp node/.env.sample node/.env
cp frontend/.env.sample frontend/.env
```

### How to run project

In the project directory, you can run:

#### `npm install`

Installs the necessary dependencies to run the backend and frontend applications.

#### `npm start`

Starts the backend Node.js server and the frontend React application.

The server will run on [http://localhost:4242](http://localhost:4242).
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Configuring Stripe

A `.env.sample` file is provided in the `node` directory. Copy this file to a new file named `.env` in the same directory. Then, update the `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` variables in the `.env` file with your actual Stripe keys. You can use key from .env.sample file.

