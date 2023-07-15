const ticketDetailsContainer = document.getElementById("ticket-details");

// Retrieve booking ID from local storage
const bookingId = localStorage.getItem("bookingId");

// Function to fetch booking data from JSON server
async function fetchBookings(bookingId) {
  try {
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

    // Create a new div for each booking
    const bookingDiv = document.createElement("div");
    bookingDiv.classList.add("booking");

    // Calculate the total price based on the flight price and the number of passengers
    const totalPrice = flight.price * booking.passengers;

    // Populate the booking details
    bookingDiv.innerHTML = `
        <div class="detail">
          <span class="label">Passenger Name:</span>
          <span class="value">${userName}</span>
        </div>
        <div class="detail">
          <span class="label">Flight Number:</span>
          <span class="value">${flight.flightNumber}</span>
        </div>
        <div class="detail">
          <span class="label">Departure:</span>
          <span class="value">${flight.departure}</span>
        </div>
        <div class="detail">
          <span class="label">Arrival:</span>
          <span class="value">${flight.arrival}</span>
        </div>
        <div class="detail">
          <span class="label">Departure Time:</span>
          <span class="value">${flight.departureTime}</span>
        </div>
        <div class="detail">
          <span class="label">Arrival Time:</span>
          <span class="value">${flight.arrivalTime}</span>
        </div>
        <div class="detail">
          <span class="label">Class:</span>
          <span class="value">${booking.classType}</span>
        </div>
        <div class="detail">
          <span class="label">Passengers:</span>
          <span class="value">${booking.passengers}</span>
        </div>
        <div class="detail">
          <span class="label">Total Price:</span>
          <span class="value">${totalPrice}</span>
        </div>
      `;

    // Add the booking div to the container
    ticketDetailsContainer.appendChild(bookingDiv);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
}

// Call the function to fetch and display the booking
fetchBookings(bookingId);

// Clear the booking ID from local storage after displaying the details
localStorage.removeItem("bookingId");
