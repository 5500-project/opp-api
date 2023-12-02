import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Account.css";

function AccountPage() {
  const location = useLocation();
  const username = location.state?.username;
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add logout logic here (e.g., clearing user credentials)
    // ...

    // Redirect to the main page after logout
    navigate("/");
  };
  const report = {
    status: "completed",
    user_id: "3",
    amount: 17.0,
    transaction_date:"2023-11-21T22:42:07.953692",
    id:7,
    payment_method:"debit"
  }

  const handleNavigationClick = (path) => {
    // Check if the user is logged in
    if (!username) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, navigate to the specified path
      if (path === "/home") {
        // If the path is "/home", navigate to the main page with the username
        navigate("/", { state: { username } });
      } else if (path === "/payment") {
        // Otherwise, navigate to the specified path
        navigate("/payment", { state: { username } });
      } else if (path === "/manage") {
        navigate("/account", { state: { username } });
      } else if (path == "/history") {
        navigate("/history", { state: { username } });
      }
    }
  };
  // Use the username to fetch user information from the backend

  return (
    <body>
      <header className="header">
        {/* Header content, including logo, user profile, and navigation links and logout logo*/}
        <h1>Logo</h1>
        <nav>
          <ul>
            {/* Navigation links */}
            <li>
              <span onClick={() => handleNavigationClick("/home")}>Home</span>
            </li>
            <li>
              <span onClick={() => handleNavigationClick("/payment")}>
                Make Transaction
              </span>
            </li>

            <li>
              <span onClick={() => handleNavigationClick("/history")}>
                Payment History
              </span>
            </li>
            <li onClick={handleLogout}>Logout</li>
            {/* ... */}
          </ul>
        </nav>
      </header>

      <main>
        {/* Display user informationstyle={{ width: '80px', height: 'auto' }} */}

        <div className="user-profile-container">


      <div className="left-side">
      <div className="left-corner">
        <h3>Welcome, {username}!</h3>
        <img
          src="https://i.pinimg.com/474x/ba/f2/f8/baf2f87b72d2d5762ec58ab42d63d1b1.jpg"
          alt="User Avatar"
          className="user-avatar"
          style={{ width: '200px', height: 'auto' }}
        />
      </div>
        <nav className="user-navigation">
          <ul>
            <li>
              <button>Change User Password</button>
            </li>
            <li>
              <button>Deactivate User</button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="right-side">
        <h4><b>Financial Report:</b> This is your latest financial report!</h4>
        {/*financial report details */}
        <div className="finance-report">
            <h2>Payment Status</h2>
            <div className="status">
                <strong>Status:</strong> {report.status}
            </div>
            <div className="user-id">
                <strong>User ID:</strong> {report.user_id}
            </div>
            <div className="amount">
                <strong>Amount:</strong> ${report.amount.toFixed(2)}
            </div>
            <div className="transaction-date">
                <strong>Transaction Date:</strong> {report.transaction_date}
            </div>
            <div className="payment-method">
                <strong>Payment Method:</strong> {report.payment_method}
            </div>
        </div>

            <Link
            to={{ pathname: "/history", state: { username } }}
            className="moreOptionsButton"
            onClick={() => handleNavigationClick("/history")}
            >
            Show All Transaction History
            </Link>
      </div>
    </div>
    </main>
    </body>
  );
}

export default AccountPage;
