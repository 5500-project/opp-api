// MainPage.js
import React from "react";
import Header from "./Header";
import "../styles/MainPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function MainPage() {
  const location = useLocation();
  const username = location.state?.username;
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout logic here 
    // Redirect to the main page after logout
    navigate("/");
  };
  const handleServiceClick = (serviceLink) => {
    // Check if the user is logged in
    if (!username) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, navigate to the respective service webpage
      navigate(serviceLink, { state: { username } });
    }
  };
  const handleNavigationClick = (path) => {
    // Check if the user is logged in

    if (!username) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, navigate to the specified path
      navigate(path, { state: { username } });
    }
  };

  return (
    <body>
      <div>
        <h1>Logo</h1>
      </div>
      <div>
        <Header username={username} onLogout={handleLogout} />
      </div>
      <div className="main-page">
        <section className="Nav bar">
          <nav className="navigation-bar">
            <ul>
              <li>
                <span onClick={() => handleNavigationClick("/account")}>
                  Account
                </span>
              </li>
              <li>
                <span onClick={() => handleNavigationClick("/payment")}>
                  Transaction
                </span>
              </li>
              <li>
                <span onClick={() => handleNavigationClick("/history")}>
                  Payment History
                </span>
              </li>
              <li>
                <Link to="/help">Features</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
            </ul>
          </nav>
        </section>

        <section className="introduction">
          {/* Introduction boxes */}
          <div className="intro-container">
            <div className="intro-box">
              <h2 className="box-title">Left Introduction Box</h2>
              <p className="box-content">
                This is the content of the left introduction box. This is the
                content of the left introduction box. This is the content of the
                left introduction box. This is the content of the left
                introduction box. This is the content of the left introduction
                box. This is the content of the left introduction box.
              </p>
              <figure className="box-figure"></figure>
            </div>
          </div>
        </section>
        <section className="introduction">
          {/* Introduction boxes */}
          <div className="intro-container">
            <div className="intro-box">
              <h2 className="box-title">Left Introduction Box</h2>
              <p className="box-content">
                This is the content of the left introduction box. This is the
                content of the left introduction box. This is the content of the
                left introduction box. This is the content of the left
                introduction box. This is the content of the left introduction
                box. This is the content of the left introduction box. This is
                the content of the left introduction box. This is the content of
                the left introduction box. This is the content of the left
                introduction box.
              </p>
              <figure className="box-figure"></figure>
            </div>
          </div>
        </section>
        <section>
          {/* Main service boxes */}
          <div className="main-service-container">
            <div
              className="main-service-box"
              onClick={() => handleServiceClick("/account")}
            >
              <h2>Account</h2>
              <p>Manage your personal account.</p>
            </div>

            <div
              className="main-service-box"
              onClick={() => handleServiceClick("/payment")}
            >
              <h2>Transaction</h2>
              <p>Make a transaction now!</p>
            </div>

            <div
              className="main-service-box"
              onClick={() => handleServiceClick("/history")}
            >
              <h2>Payment History</h2>
              <p>Find your payment history.</p>
            </div>

            <div className="main-service-box">
              <h2>Features</h2>
              <p>Find all features.</p>
            </div>
          </div>
        </section>
        <div className="footer">
          <p>
            &copy; 2023 CompanyXXX. All rights reserved. | Privacy Policy |
            Terms of Service
          </p>
        </div>
      </div>
    </body>
  );
}

export default MainPage;
