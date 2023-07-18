// Signup form submit event handler
document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Storing user input
    const name = document.getElementById("id_name").value;
    const email = document.getElementById("id_email").value;
    const password = document.getElementById("id_password").value;

    // Making user object to append users array in server after successful signup
    const user = {
      name,
      email,
      password,
      bookings: [],
    };

    try {
      // Posting user object to users end point / users array in server
      const response = await fetch(
        "https://airport-portal-api.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        // Redirect to login page after successful signup
        window.location.href = "login.html";
      } else {
        alert("Error creating user. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
    }
  });
