// Signup form submit event handler
document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("id_name").value;
    const email = document.getElementById("id_email").value;
    const password = document.getElementById("id_password").value;

    const user = {
      name,
      email,
      password,
      bookings: [],
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully:", data);

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
