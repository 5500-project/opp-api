// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Header.css";

// const Header = () => {
//   return (
//     <div className="header">
//       {/* Your other header content */}
//       <Link to="/login">Login</Link>
//       <Link to="/signup">Signup</Link>
//     </div>
//   );
// };

// // export default Header;
// // Header.js
// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Header.css";

// const Header = ({ username }) => {
//   return (
//     <div className="header">
//       {/* other header content */}
//       {username ? (
//         <>
//           <p>Welcome, {username}!</p>
//           <button>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Signup</Link>
//         </>
//       )}
//     </div>
//   );
// };

// Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic
    onLogout();

    // Redirect to the main page after logout
    navigate("/");
  };
  // Inside login or signup component
  const handleLogin = () => {
    // logic here
    const username = "John"; // Replace this with the actual username

    // Navigate to the main page with the username state
    navigate("/", { state: { username } });
  };

  return (
    <div className="header">
      {/* other header content */}
      {username ? (
        <>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
};

export default Header;
