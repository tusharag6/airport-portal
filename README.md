# Airline Booking Management Project

This project is an Airline Booking Management System built using HTML, CSS, JavaScript, and JSON Server. It provides functionality for user login, signup, flight booking, and ticket confirmation.

## Features

- User authentication: Users can sign up and log in to access the booking functionality.
- Flight booking: Users can book flights, specifying source, destination, date, class and number of passengers.
- Ticket confirmation: Users receive a confirmation ticket with booking details.

## Technologies Used

- HTML
- CSS
- JavaScript
- JSON Server

## Screenshots

### Signup Page

![Signup Page](/screenshots/signup.png)

### Login Page

![Login Page](/screenshots/login.png)

### Flight Booking Page

![Flight Booking Page](/screenshots/booking.png)

### Available Flights Display Page

![Available Flights Display Page](/screenshots/flightDisplay.png)

### Ticket Confirmation Page

![Ticket Confirmation Page](/screenshots/ticket-display.png)

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

4. Open the `signup.html` file in your web browser

## Project Structure

- `signup.html` : Landing page with signup form
- `login.html` : Landing page with login form
- `booking.html` : Flight booking page
- `flightDisplay.html` : Available flights display page
- `ticketConf.html` : Ticket confirmation page
- `css/` : Directory containing CSS stylesheets
- `js/` : Directory containing JavaScript files for different functionalities
- `img/` : Directory containing images
- `db.json`: JSON database file containing flight and user data
- `screenshots/` : Directory for storing project screenshots
