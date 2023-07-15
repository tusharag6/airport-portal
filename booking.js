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
    // console.log(data);
    if (data.length > 0) {
      populateFlightsTable(data);
    } else {
      alert("No flights available for the selected route.");
    }
  } catch (error) {
    alert("Error fetching the flights");
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
      <td>${flight.departureTime}</td>
      <td>${flight.arrival}</td>
      <td>${flight.arrivalTime}</td>
      <td>${flight.price}</td>
      <td>${flight.seatsAvailable}</td>
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
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      const flight = await response.json();

      if (flight.seatsAvailable > 0) {
        const userId = 1;
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

        if (bookingResponse.ok) {
          // Update the seats available for the flight
          await fetch(`http://localhost:3000/flights/${flightId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ seatsAvailable: flight.seatsAvailable - 1 }),
          });

          const data = await bookingResponse.json();
          console.log("Booking successful:", data);
          alert("Booking Successful");
        } else {
          alert("Booking failed");
          throw new Error("Booking failed");
        }
      } else {
        alert("FLight Not Available");
        console.error("Flight not available, please book another flight");
      }
    } catch (error) {
      alert("Error while fetching");
      console.error("Error:", error);
    }
  }
}

// Attach event listeners to the form and table for search and booking functionality
const bookingForm = document.getElementById("booking-form");
const flightsTable = document.getElementById("flights-table");

bookingForm.addEventListener("submit", searchFlights);
flightsTable.addEventListener("click", bookFlight);
