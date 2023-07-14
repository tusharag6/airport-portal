# Airline Booking Management Project

This is a web application for managing airline bookings. It allows users to login, sign up, search for flights, and make bookings. The project is built using HTML, CSS, and JavaScript, with data stored in a JSON Server.

## Features

- User Authentication: Users can create accounts, login, and logout.
- Flight Search: Users can search for flights based on departure, arrival, and date.
- Flight Booking: Users can select a flight and book tickets.
- Data Persistence: User and flight data are stored in a JSON Server.

## Prerequisites

- Web browser to run the HTML files.
- JSON Server to serve the data. You can install it using npm:

```bash
npm install json-server
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/rz03/airport-portal.git
```

2. Start the JSON Server:

```bash
json-server --watch db.json
```

3. Open the `booking.html` file in your web browser

## Project Structure

- `booking.html`: Booking page HTML file.
- `booking.css`: CSS file for styling the Booking Page.
- `booking.js`: JavaScript file for handling form submissions and API calls for booking.
- `db.json`: JSON file serving as the backend database.
