// import React from "react";
// import "../styles/PaymentMain.css";

// class PaymentMain extends React.Component {
//   render() {
//     return (
//       <body>
//         {" "}
//         <header className="header">
//           {/* Header content, including logo, user profile, and navigation links and logout logo*/}
//           <h1>Logo</h1>
//           <nav>
//             <ul>
//               {/* Navigation links */}
//               <li>Home</li>
//               <li>My Account</li>
//               <li>Logout</li>
//               {/* ... */}
//             </ul>
//           </nav>
//         </header>
//         <div className="payment-container">
//           <div className="left-part">
//             <h2>Send Money</h2>
//             <form id="send-money-form">
//               <label htmlFor="name">Name:</label>
//               <input type="text" id="name" name="name" required />
//               <br />

//               <label htmlFor="username">Username:</label>
//               <input type="text" id="username" name="username" required />
//               <br />

//               <label htmlFor="email">Email:</label>
//               <input type="email" id="email" name="email" required />
//               <br />

//               <label htmlFor="mobile">Mobile:</label>
//               <input type="tel" id="mobile" name="mobile" required />
//               <br />

//               <button
//                 type="button"
//                 onClick={() => alert("Next button clicked!")}
//               >
//                 Next
//               </button>
//             </form>
//           </div>

//           <div className="right-part">
//             <h2>More Ways to Send</h2>
//             <div className="more-ways-section">
//               <p>Send to a bank account</p>
//               <p>Over 90 destination countries.</p>

//               <p>Send cash for pick up</p>
//               <p>Over 110 destination countries.</p>

//               <p>Send an invoice</p>
//               <p>Customize, track, and send invoices.</p>

//               <p>Send a digital gift card</p>
//               <p>
//                 Choose from over 300 gift card brands and personalize it with a
//                 message.
//               </p>

//               <p>Send and receive donations</p>
//               <p>Find support and help others now.</p>
//             </div>
//           </div>
//         </div>
//         <footer className="footer">
//           <p>
//             &copy; 2023 CompanyXXX. All rights reserved. | Privacy Policy |
//             Terms of Service
//           </p>
//         </footer>
//       </body>
//     );
//   }
// // }

// // export default PaymentMain;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/PaymentMain.css";

// function PaymentMain() {
//   const navigate = useNavigate();

//   // Initialize state to store user information
//   const [userData, setUserData] = useState({
//     userid: "",
//     username: "",
//     paymentMethod: "Debit",
//     card_number: "",
//   });

//   // Function to handle logout
//   const handleLogout = () => {
//     // Add logout logic here (e.g., clearing user credentials)
//     // ...

//     // Redirect to the main page after logout
//     navigate("/");
//   };

//   // Function to handle the "Next" button click
//   const handleNextButtonClick = async () => {
//     // Create an object with the user data
//     const userDataToSend = {
//       user_id: userData.name,
//       amount: userData.username,
//       payment_method: userData.email,
//       card_number: userData.mobile,
//     };

//     try {
//       // Make a POST request to Flask backend
//       //   const response = await fetch("http://127.0.0.1:5000/save-user", {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     body: JSON.stringify(userDataToSend),
//       //   });
//       navigate("/payment-verification", { state: userData });
//       const response = true;
//       response.ok = true;

//       if (response.ok) {
//         // If the response is okay, navigate to payment verification page
//         // navigate("/payment-verification", { state: userData });
//         navigate("/");
//       } else {
//         alert("Error sending user data.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [name]: value,
//     }));
//   };

//   return (
//     <body>
//       <header className="header">
//         {/* Header content, including logo, user profile, and navigation links and logout logo*/}
//         <h1>Logo</h1>
//         <nav>
//           <ul>
//             {/* Navigation links */}
//             <li>Home</li>
//             <li>My Account</li>
//             <li onClick={handleLogout}>Logout</li>
//             {/* ... */}
//           </ul>
//         </nav>
//       </header>
//       <div className="payment-container">
//         <div className="left-part">
//           <h2>Send Money</h2>
//           <form id="send-money-form">
//             <label htmlFor="userid">UserID:</label>
//             <input
//               type="text"
//               id="user-id"
//               name="user-id"
//               required
//               onChange={handleInputChange}
//             />
//             <br />

//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="text"
//               id="amount"
//               name="amount"
//               required
//               onChange={handleInputChange}
//             />
//             <br />

//             <label htmlFor="paymentMethod">Payment Method:</label>
//             <select
//               id="paymentMethod"
//               name="paymentMethod"
//               onChange={handleInputChange}
//             >
//               <option value="Credit">Credit</option>
//               <option value="Debit">Debit</option>
//             </select>
//             <br />

//             <label htmlFor="card_number">Card number</label>
//             <input
//               type="text"
//               id="card_number"
//               name="card_number"
//               required
//               onChange={handleInputChange}
//             />
//             <br />

//             <button type="button" onClick={handleNextButtonClick}>
//               Transaction now!
//             </button>
//           </form>
//         </div>

//         <div className="right-part">
//           <h2>More Ways to Send</h2>
//           <div className="more-ways-section">
//             <p>Send to a bank account</p>
//             <p>Over 90 destination countries.</p>

//             <p>Send cash for pick up</p>
//             <p>Over 110 destination countries.</p>

//             <p>Send an invoice</p>
//             <p>Customize, track, and send invoices.</p>

//             <p>Send a digital gift card</p>
//             <p>
//               Choose from over 300 gift card brands and personalize it with a
//               message.
//             </p>

//             <p>Send and receive donations</p>
//             <p>Find support and help others now.</p>
//           </div>
//         </div>
//       </div>
//       <footer className="footer">
//         <p>
//           &copy; 2023 CompanyXXX. All rights reserved. | Privacy Policy | Terms
//           of Service
//         </p>
//       </footer>
//     </body>
//   );
// }
// export default PaymentMain;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PaymentMain.css";

function PaymentMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  const [userData, setUserData] = useState({
    user_id: "",
    paymentMethod: "Debit",
    card_number: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

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
      } else if (path === "/account") {
        // Otherwise, navigate to the specified path
        navigate("/account", { state: { username } });
      }else if (path === "/history") {
        // Otherwise, navigate to the specified path
        navigate("/history", { state: { username } });
      }
    }
  };

  const handleNextButtonClick = async () => {
    const userDataToSend = {
      amount: userData.amount,
      payment_method: userData.paymentMethod,
      card_number: userData.card_number,
    };

    if (!userData.amount || !userData.card_number || !userData.user_id) {
      setError("Please enter amount, userID and card number!");
      return;
    }
    try {
      setLoading(true);

      // Call the backend to check if the transaction is valid
      const transactionCheckResponse = await axios.post(
        "/api/check-transaction",
        { userDataToSend }
      );

      const { success, msg } = transactionCheckResponse.data;

      if (success) {
        // Call the backend to make the transaction
        const transactionResponse = await axios.post("/api/make-transaction", {
          userDataToSend,
        });

        // Handle the success response from the backend
        const { success: transactionSuccess, msg: transactionMsg } =
          transactionResponse.data;

        if (transactionSuccess) {
          // Transaction successful, you can handle the success case
          console.log(transactionMsg);

          // Redirect to payment history or any other page
          navigate("/payment-history");
        } else {
          // Transaction failed, handle the error case
          setError(transactionMsg);
        }
      } else {
        // Transaction not valid, handle the error case
        setError(msg);
      }
    } catch (error) {
      // Handle other errors
      setError("An error occurred while processing the transaction.");
    } finally {
      setLoading(false);
    }
    //save user data
    try {
      // Make a POST request to save user data (//not sure if necessary)
      const response = await axios.post("/api/save-user", userDataToSend);

      if (response.ok) {
        // If the response is okay, navigate to the payment page
        navigate("/payment", { state: { username, ...userData } });
      } else {
        alert("Error sending user data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clearing user credentials)
    // ...

    // Redirect to the main page after logout
    navigate("/");
  };

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
              <span onClick={() => handleNavigationClick("/account")}>
                My Account
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
      <p>Welcome {username}, here is the form to send money.</p>
      <div className="payment-container">
        <div className="left-part">
          <h2>Send Money</h2>
          <form id="send-money-form">
            <label htmlFor="user_id">UserID:</label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              required
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              required
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              onChange={handleInputChange}
            >
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
            <br />

            <label htmlFor="card_number">Card number</label>
            <input
              type="text"
              id="card_number"
              name="card_number"
              required
              onChange={handleInputChange}
            />
            <br />
            <button type="button" onClick={handleNextButtonClick}>
              Next
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <div className="right-part">
          <h2>More Ways to Send</h2>
          <div className="more-ways-section">
            <p>Send to a bank account</p>
            <p>Over 90 destination countries.</p>

            <p>Send cash for pick up</p>
            <p>Over 110 destination countries.</p>

            <p>Send an invoice</p>
            <p>Customize, track, and send invoices.</p>

            <p>Send a digital gift card</p>
            <p>
              Choose from over 300 gift card brands and personalize it with a
              message.
            </p>

            <p>Send and receive donations</p>
            <p>Find support and help others now.</p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>
          &copy; 2023 CompanyXXX. All rights reserved. | Privacy Policy | Terms
          of Service
        </p>
      </footer>
    </body>
  );
}
export default PaymentMain;
