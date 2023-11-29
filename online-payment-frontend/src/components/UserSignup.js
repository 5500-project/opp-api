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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!username || !password || password !== confirmPassword) {
      setError("Please enter valid username and matching passwords.");
      return;
    }

    try {
      // Simulate signup for demonstration purposes
      const newUser = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      };

      // Make an API call to save user information to the backend
      const response = await axios.post("http://backend-url/auth/", newUser);

      // Handle successful signup (check the response status)
      if (response.status === 201) {
        // Redirect to the login page after successful signup
        navigate("/login");
      } else {
        // Handle signup failure (e.g., display an error message)
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Error during signup. Please try again later.");
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
