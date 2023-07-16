# Airline Booking Management Project

This project is an Airline Booking Management System built using HTML, CSS, JavaScript, and JSON Server. It provides functionality for user login, signup, flight booking, and ticket confirmation.

## Features

- User authentication: Users can sign up and log in to access the booking functionality.
- Flight booking: Users can book flights, specifying the class and number of passengers.
- Ticket confirmation: Users receive a confirmation ticket with booking details.

## Technologies Used

- HTML
- CSS
- JavaScript
- JSON Server

## Screenshots

### Login / Signup Page

![Login / Signup Page](/screenshots/auth.png)

### Flight Booking Page

![Flight Booking Page](/screenshots/booking.png)

### Available Flights Display Page

![Available Flights Display Page](/screenshots/flightDisplay.png)

### Ticket Confirmation Page

![Ticket Confirmation Page](/screenshots/ticketConf.png)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/rz03/airport-portal.git
```

2. Install the dependencies:

```bash
cd airport-portal
npm install
```

3. Start the JSON Server:

```bash
json-server --watch db.json
```

4. Open the `auth.html` file in your web browser

## Project Structure

- `auth.html` : Landing page with login and signup forms
- `booking.html` : Flight booking page.
- `ticketConf.html` : Ticket confirmation page
- `css/` : Directory containing CSS stylesheets
- `js/` : Directory containing JavaScript files for different functionalities
- `db.json`: JSON database file containing flight and user data
- `screenshots/` : Directory for storing project screenshots
