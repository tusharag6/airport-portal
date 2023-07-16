// Login form submit event handler
document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Storing user input
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      // Get request from the users endpoint
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      // Find the user with matching email and password
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Store the user ID in local storage
        localStorage.setItem("userId", user.id);
        // Redirect to home page
        window.location.href = "booking.html";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error logging in. Please try again.");
    }
  });
