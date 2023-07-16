// Populate the flights table with retrieved flight data
function populateFlightsTable(flights) {
  const flightsBody = document.getElementById("flights-body");
  flightsBody.innerHTML = "";

  // Displaying each flights that are present in the selected route
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

// Retrieving flights data from local storage and populating the table
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

      // Check if seats are available in the selected flight
      if (flight.seatsAvailable > 0) {
        // Retrieve the user ID from local storage
        const userId = localStorage.getItem("userId");
        const classType = localStorage.getItem("classType");
        const passengers = localStorage.getItem("passengers");

        // Creating booking object that will be posted to bookings endpoint in server
        const booking = {
          userId,
          flightId,
          bookingDate,
          classType,
          passengers,
        };

        // Posting the booking object to the server at bookings endpoint
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
            body: JSON.stringify({
              seatsAvailable: flight.seatsAvailable - passengers,
            }),
          });

          // Add the booking to the user's "bookings" array
          const data = await bookingResponse.json();
          await addBookingToUser(userId, data);

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

    // Updating the users array / endpoint
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.error("Error adding booking to user:", error);
  }
}

// Attach event listener to the table for book button
const flightsTable = document.getElementById("flights-table");
flightsTable.addEventListener("click", bookFlight);
