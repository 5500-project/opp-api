// import React from "react";
// import Header from "./Header";
// import NavigationBar from "./NavigationBar";
// import "../styles/MainPage.css";

// function MainPage() {
//   return (
//     <div className="main-page">
//       <Header />
//       <NavigationBar />
//       <section className="introduction">
//         {/* Introduction boxes */}
//         <div className="intro-container">
//           <div className="intro-box">
//             <h2>Left Introduction Box</h2>
//             <p>
//               This is the content of the left introduction box11. This is the
//               content of the left introduction box11. This is the content of the
//               left introduction box11. This is the content of the left
//               introduction box11. This is the content of the left introduction
//               box11. This is the content of the left introduction box11.
//             </p>
//           </div>

//           <div className="intro-box">
//             <h2>Right Introduction Box</h2>
//             <p>
//               This is the content of the right introduction box. This is the
//               content of the right introduction box. This is the content of the
//               right introduction box. This is the content of the right
//               introduction box. This is the content of the right introduction
//               box. This is the content of the right introduction box.
//             </p>
//           </div>
//         </div>
//       </section>
//       <section>
//         {/* Main service boxes */}
//         <div className="main-service-container">
//           <div className="main-service-box">
//             <h2>Service 1</h2>
//             <p>Description of Service 1.</p>
//           </div>

//           <div className="main-service-box">
//             <h2>Service 2</h2>
//             <p>Description of Service 2.</p>
//           </div>

//           <div className="main-service-box">
//             <h2>Service 3</h2>
//             <p>Description of Service 3.</p>
//           </div>

//           <div className="main-service-box">
//             <h2>Service 4</h2>
//             <p>Description of Service 4.</p>
//           </div>
//         </div>
//       </section>
//       <div className="footer">
//         <p>
//           &copy; 2023 CompanyXXX. All rights reserved. | Privacy Policy | Terms
//           of Service
//         </p>
//       </div>
//     </div>
//   );
// }

// // export default MainPage;
// // MainPage.js
// import React from "react";
// import Header from "./Header";
// import NavigationBar from "./NavigationBar";
// import "../styles/MainPage.css";
// import { useLocation } from "react-router-dom";

// function MainPage() {
//   const location = useLocation();
//   const username = location.state?.username || "Guest"; // Default to "Guest" if no username is present

//   return (
//     <div className="main-page">
//       <Header username={username} />
//       <NavigationBar />
//       {/* ... rest of your MainPage component */}
//     </div>
//   );
// }

// export default MainPage;
// MainPage.js
import React from "react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";
import "../styles/MainPage.css";
import { useLocation, useNavigate } from "react-router-dom";

function MainPage() {
  const location = useLocation();
  const username = location.state?.username;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing user credentials)
    // ...

    // Redirect to the main page after logout
    navigate("/");
  };

  return (
    <div className="main-page">
      <Header username={username} onLogout={handleLogout} />
      <NavigationBar />
      {/* ... rest of your MainPage component */}
      <section className="introduction">
        {/* Introduction boxes */}
        <div className="intro-container">
          <div className="intro-box">
            <h2>Left Introduction Box</h2>
            <p>
              This is the content of the left introduction box11. This is the
              content of the left introduction box11. This is the content of the
              left introduction box11. This is the content of the left
              introduction box11. This is the content of the left introduction
              box11. This is the content of the left introduction box11.
            </p>
          </div>

          <div className="intro-box">
            <h2>Right Introduction Box</h2>
            <p>
              This is the content of the right introduction box. This is the
              content of the right introduction box. This is the content of the
              right introduction box. This is the content of the right
              introduction box. This is the content of the right introduction
              box. This is the content of the right introduction box.
            </p>
          </div>
        </div>
      </section>
      <section>
        {/* Main service boxes */}
        <div className="main-service-container">
          <div className="main-service-box">
            <h2>Service 1</h2>
            <p>Description of Service 1.</p>
          </div>

          <div className="main-service-box">
            <h2>Service 2</h2>
            <p>Description of Service 2.</p>
          </div>

          <div className="main-service-box">
            <h2>Service 3</h2>
            <p>Description of Service 3.</p>
          </div>

          <div className="main-service-box">
            <h2>Service 4</h2>
            <p>Description of Service 4.</p>
          </div>
        </div>
      </section>
      <div className="footer">
        <p>
          &copy; 2023 CompanyXXX. All rights reserved. | Privacy Policy | Terms
          of Service
        </p>
      </div>
    </div>
  );
}

export default MainPage;
