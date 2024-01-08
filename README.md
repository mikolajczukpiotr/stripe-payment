# Project Title

This project is a simple payment application that uses Stripe to process payments. It is built using React and Node.js.

## Project Structure

The project is divided into two main folders:

- `frontend`: This folder contains the React application.
- `node`: This folder contains the Node.js server.

## Available Scripts

### Backend

In the `node` directory, you can run:

#### `npm install`

Installs the necessary dependencies to run the backend server.

#### `npm start`

Starts the backend Node.js server.\
The server will run on [http://localhost:4242](http://localhost:4242).

### Frontend

In the `frontend` directory, you can run:

#### `npm install`

Installs the necessary dependencies to run the frontend application.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Configuring Stripe

To change the Stripe key, update the `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` variable in the `.env` file in the `node` directory 
