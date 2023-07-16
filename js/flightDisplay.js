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
const flights = JSON.parse(localStorage.getItem("flights"));
populateFlightsTable(flights);
// Handle flight booking
async function bookFlight(event) {
  if (event.target.classList.contains("book-button")) {
    const flightId = event.target.dataset.flightId;
    const bookingDate = new Date().toISOString();

    try {
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      const flight = await response.json();

      if (flight.seatsAvailable > 0) {
        // Retrieve the user ID from local storage
        const userId = localStorage.getItem("userId");
        const classType = localStorage.getItem("classType");
        const passengers = localStorage.getItem("passengers");
        const booking = {
          userId,
          flightId,
          bookingDate,
          classType,
          passengers,
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
          // Add the booking to the user's "bookings" array
          await addBookingToUser(userId, data);
          console.log("Booking successful:", data);
          // alert("Booking Successful");
          // Store the booking ID in local storage
          localStorage.setItem("bookingId", data.id);
          // Redirect to the ticket confirmation page
          window.location.href = "ticketConf.html";
        } else {
          alert("Booking failed");
          throw new Error("Booking failed");
        }
      } else {
        alert("Flight Not Available");
        console.error("Flight not available, please book another flight");
      }
    } catch (error) {
      alert("Error while fetching");
      console.error("Error:", error);
    }
  }
}

// Function to add the booking to the user's "bookings" array
async function addBookingToUser(userId, bookingData) {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await response.json();

    user.bookings.push(bookingData);

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log("Booking added to user:", user);
  } catch (error) {
    console.error("Error adding booking to user:", error);
  }
}

// Attach event listener to the table for book button functionality
const flightsTable = document.getElementById("flights-table");
flightsTable.addEventListener("click", bookFlight);
