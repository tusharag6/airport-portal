document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Retrieve form data
    // var email = document.getElementById("signup-form").elements[0].value;
    // var password = document.getElementById("signup-form").elements[1].value;
    // var confirmPassword = document.getElementById("signup-form").elements[2].value;
    
    var email = document.getElementById("id_email").value;
    var password = document.getElementById("id_password").value;
    var confirmPassword = document.getElementById("id_CnfPass").value;
    // Perform signup validation and logic here
    
    // Clear form fields
    if(password != confirmPassword){
      alert("Opps! Password and confirmed password is not matching!");
    }
    else{
      alert("Login Success!");
    }
    
    //document.getElementById("signup-form").reset();
  });
  
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Retrieve form data
    var email = document.getElementById("login-form").elements[0].value;
    var password = document.getElementById("login-form").elements[1].value;
    
  });
  
  document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Retrieve form data
    var email = document.getElementById("forgot-password-form").elements[0].value;
    
    });
  