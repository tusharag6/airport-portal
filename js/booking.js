// Fetch flight data from JSON Server based on user input
async function searchFlights(event) {
  event.preventDefault();

  // Storing the value of user input
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
    // Get Request
    const response = await fetch(url);
    const data = await response.json();

    // If flight is availabe for the route i.e length>0
    if (data.length > 0) {
      // Storing some data in local storage that will be used in the next page
      localStorage.setItem("flights", JSON.stringify(data));
      localStorage.setItem("classType", fclass);
      localStorage.setItem("passengers", passengers);
      // Redirect
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
