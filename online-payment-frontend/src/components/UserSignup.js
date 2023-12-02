// UserSignup.js
// import React from "react";

// const UserSignup = ({ onLogin }) => {
//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Perform signup logic here

//     // Simulate successful signup
//     const user = { username: "exampleUser" };
//     onLogin(user);
//   };

//   return (
//     <div className="user-signup">
//       <form onSubmit={handleSignup}>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" name="username" />

//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" name="password" />

//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// // export default UserSignup;
// // UserSignup.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/UserSignUp.css";

// const UserSignup = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Perform signup logic...
//     // Simulate signup for demonstration purposes
//     const newUser = {
//       username: event.target.elements.username.value,
//       password: event.target.elements.password.value,
//       // Include other user information if needed
//     };

//     try {
//       const response = true;
//       // Make an API call to save user information to the backend
//       // Replace the URL and method with your actual API endpoint and method
//       //   const response = await fetch("your-api-endpoint", {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     body: JSON.stringify(newUser),
//       //   });
//       //response.ok = true;

//       // Handle successful signup (you may want to check the response status)
//       if (response == true) {
//         // Redirect to the login page after successful signup
//         navigate("/login");
//       } else {
//         // Handle signup failure (e.g., display an error message)
//         console.error("Signup failed");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h2>Create Your Account</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* Include other input fields for additional user information if needed */}

//           <button type="submit">Signup</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserSignup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserSignUp.css";

const UserSignup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!username || !password || password !== confirmPassword || !email) {
      setError("Please enter valid username, email and matching passwords.");
      return;
    }

    try {
      // Simulate signup for demonstration purposes
      const newUser = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
        email: event.target.elements.email.value,
        first_name: event.target.elements.firstName,
        last_name: event.target.elements.lastName,
        phone_number: event.target.elements.phoneNumber,
        role: event.target.elements.role
      };

      const testUser = {
        "email": "example@example.com",
        "username": "example_username",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "1234567890",
        "password": "example_password",
        "role": "user"
      };
      const headers = {
        "accept": "application/json",
        "Content-Type": "application/json"
      };

      const backendURL = 'http://18.216.139.10:8000/auth/';
      const response = await axios.post(backendURL, testUser, { headers });
    
      if (response.status === 201) {
        navigate("/login");
      } else if (response.status === 400) {
        setError("Username or email already registered. Please choose a different one.");
      } else if (response.status === 422) {
        setError("Validation error. Please check your input.");
      } else {
        console.error("Unexpected error during signup:", response);
        setError("Unexpected error during signup. Please try again later.");
      }

    } catch (error) {

      console.error("Error during signup:", error);
      setError(`Error during signup: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
