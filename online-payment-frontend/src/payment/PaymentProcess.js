import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentVerification.css";

const PaymentProcess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extracting data from location.state or providing defaults
  const username = location.state?.username || "DefaultUsername";
  const accessToken = location.state?.accessToken || "DefaultAccessToken";
  const userDataToSend = location.state?.userDataToSend;

  
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const handleFinishTransaction = () => {
    // logic before finishing the transaction
    alert("Transaction finished!");
    navigate("/account", { state: { username, accessToken } }); // Redirect to the main page after finishing the transaction
  };

  return (
    <div className="verification-container">
      <h2>Payment Confirmation</h2>
      <p>Hi {username}. Here is your payment details.</p>
      <div className="finance-report">
            <h2>Payment Status</h2>
            <div className="card_number">
                <strong>Card number:</strong> {userDataToSend.card_number}
            </div>
            <div className="amount">
                <strong>Amount:</strong> ${userDataToSend.amount}
            </div>
            <div className="payment-method">
                <strong>Payment Method:</strong> {userDataToSend.paymentMethod}
            </div>
        </div>
      <button onClick={handleFinishTransaction}>Finish</button>
      <p className="verification-status">{verificationStatus}</p>
    </div>
  );
};

export default PaymentProcess;
