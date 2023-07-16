// Fetch flight data from JSON Server based on user input
async function searchFlights(event) {
  event.preventDefault();

  const fromSelect = document.getElementById("from-select");
  const toSelect = document.getElementById("to-select");
  const dateInput = document.getElementById("date-input");
  const classType = document.getElementById("class-select");
  const passengersInput = document.getElementById("passengers-input");

  const from = fromSelect.value;
  const to = toSelect.value;
  const date = dateInput.value;
  const fclass = classType.value;
  const passengers = passengersInput.value;

  const url = `http://localhost:3000/flights?departure=${from}&arrival=${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    if (data.length > 0) {
      // populateFlightsTable(data);
      localStorage.setItem("flights", JSON.stringify(data)); // Store flight data in localStorage
      localStorage.setItem("classType", fclass);
      localStorage.setItem("passengers", passengers);
      window.location.href = "flightDisplay.html";
    } else {
      alert("No flights available for the selected route.");
    }
  } catch (error) {
    alert("Error fetching the flights");
    console.error("Error fetching flights:", error);
  }
}

// Attach event listener to the form for search functionality
const bookingForm = document.getElementById("booking-form");
bookingForm.addEventListener("submit", searchFlights);
