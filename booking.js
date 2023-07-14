// Fetch flight data from JSON Server based on user input
async function searchFlights(event) {
  event.preventDefault();

  const fromSelect = document.getElementById("from-select");
  const toSelect = document.getElementById("to-select");
  const dateInput = document.getElementById("date-input");

  const from = fromSelect.value;
  const to = toSelect.value;
  const date = dateInput.value;

  const url = `http://localhost:3000/flights?departure=${from}&arrival=${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    populateFlightsTable(data);
  } catch (error) {
    console.error("Error fetching flights:", error);
  }
}

// Populate the flights table with retrieved flight data
function populateFlightsTable(flights) {
  const flightsBody = document.getElementById("flights-body");
  flightsBody.innerHTML = "";

  flights.forEach((flight) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${flight.flightNumber}</td>
      <td>${flight.departure}</td>
      <td>${flight.arrival}</td>
      <td>${flight.price}</td>
      <td><button class="book-button" data-flight-id="${flight.id}">Book</button></td>
    `;
    flightsBody.appendChild(row);
  });
}

// Handle flight booking
async function bookFlight(event) {
  if (event.target.classList.contains("book-button")) {
    const flightId = event.target.dataset.flightId;
    const bookingDate = new Date().toISOString();

    try {
      // Fetch the user ID dynamically
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      if (users.length > 0) {
        const userId = users[0].id; // Assuming the first user in the array, you can modify this based on your logic
        const booking = {
          userId,
          flightId,
          bookingDate,
        };

        const bookingResponse = await fetch("http://localhost:3000/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        });

        const data = await bookingResponse.json();
        console.log("Booking successful:", data);
        alert("Booking Successful");
      } else {
        console.error("No users found");
        // Handle case when no users are available
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error");
    }
  }
}

// Attach event listeners to the form and table for search and booking functionality
const bookingForm = document.getElementById("booking-form");
const flightsTable = document.getElementById("flights-table");

bookingForm.addEventListener("submit", searchFlights);
flightsTable.addEventListener("click", bookFlight);
