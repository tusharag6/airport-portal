const ticketDetailsContainer = document.getElementById("ticket-details");

// Retrieve booking ID from local storage
const bookingId = localStorage.getItem("bookingId");

// Function to fetch booking data from JSON server
async function fetchBookings(bookingId) {
  try {
    // Fetch the booking
    const response = await fetch(`http://localhost:3000/bookings/${bookingId}`);
    const booking = await response.json();

    // Fetch flight details
    const flightResponse = await fetch(
      `http://localhost:3000/flights/${booking.flightId}`
    );
    const flight = await flightResponse.json();

    // Retrieve the user details using the userId from the booking
    const userResponse = await fetch(
      `http://localhost:3000/users/${booking.userId}`
    );
    const user = await userResponse.json();

    // Get the user's name from the user object
    const userName = user.name;

    ticketDetailsContainer.innerHTML = "";

    // Calculate the total price based on the flight price and the number of passengers
    const totalPrice = flight.price * booking.passengers;

    // Populate the booking details
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${userName}</td>
        <td>${flight.flightNumber}</td>
        <td>${flight.departure}</td>
        <td>${flight.arrival}</td>
        <td>${flight.departureTime}</td>
        <td>${flight.arrivalTime}</td>
        <td>${booking.classType}</td>
        <td>${booking.passengers}</td>
        <td>${totalPrice}</td>
      `;

    // Add the row to the container
    ticketDetailsContainer.appendChild(row);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
}

// Call the function to fetch and display the booking
fetchBookings(bookingId);

// Clear the booking ID from local storage after displaying the details
localStorage.removeItem("bookingId");
