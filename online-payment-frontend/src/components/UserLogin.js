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
// // UserLogin.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/UserLogin.css";

// const UserLogin = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     //login logic...

//     // Simulate login for demonstration purposes
//     const enteredUsername = event.target.elements.username.value;
//     // Perform actual login logic, set user credentials, etc.

//     // Redirect to the main page after successful login
//     navigate("/", { state: { username: enteredUsername } });
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login to Your Account</h2>
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
//           <input type="password" id="password" name="password" />

//           <button type="submit">Login</button>
//         </form>

//         <p className="forgot-password">Forgot your password?</p>
//         <a href="/signup" className="forgot-password">
//           First time for our website? click here!
//         </a>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios using: npm install axios
import "../styles/UserLogin.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      // navigate("/", { state: { username } });
      // Send a request to the backend to obtain the access token
      const response = await axios.post("http://backend-url/auth/token/", {
        username,
        password,
      });

      const accessToken = response.data.access_token;

      // Save the access token in local storage or a cookie for future requests
      localStorage.setItem("accessToken", accessToken);

      // Redirect to the main page after successful login
      navigate("/", { state: { username } });
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
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
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="forgot-password">Forgot your password?</p>
        <a href="/signup" className="forgot-password">
          First time for our website? Click here!
        </a>
      </div>
    </div>
  );
};

export default UserLogin;
