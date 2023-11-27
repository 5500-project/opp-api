// // UserLogin.js
// import React from "react";
// import "../styles/UserLogin.css";

// const UserLogin = () => {
//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login to Your Account</h2>
//         <form>
//           <label htmlFor="username">Username:</label>
//           <input type="text" id="username" name="username" />

//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password" />

//           <button type="submit">Login</button>
//         </form>

//         <p className="forgot-password">Forgot your password?</p>
//       </div>
//     </div>
//   );
// };
// UserLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserLogin.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    //login logic...

    // Simulate login for demonstration purposes
    const enteredUsername = event.target.elements.username.value;
    // Perform actual login logic, set user credentials, etc.

    // Redirect to the main page after successful login
    navigate("/", { state: { username: enteredUsername } });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
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
          <input type="password" id="password" name="password" />

          <button type="submit">Login</button>
        </form>

        <p className="forgot-password">Forgot your password?</p>
      </div>
    </div>
  );
};

export default UserLogin;
