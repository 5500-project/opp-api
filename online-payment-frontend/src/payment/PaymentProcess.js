import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentVerification.css";

const PaymentVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userData = state?.userData;

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    // Simulate a backend verification process
    if (userData) {
      // Assuming a correct verification code for the sake of the example
      const correctVerificationCode = "123456";

      if (verificationCode === correctVerificationCode) {
        // Verification successful
        setVerificationStatus(
          "Verification successful! Transaction completed."
        );
        // You may want to send the userData to the backend at this point
      } else {
        // Verification failed
        setVerificationStatus("Verification failed. Please try again.");
      }
    }
  }, [userData, verificationCode]);

  const handleFinishTransaction = () => {
    // You may want to add additional logic before finishing the transaction
    alert("Transaction finished!");
    navigate("/"); // Redirect to the main page after finishing the transaction
  };

  return (
    <div className="verification-container">
      <h2>Payment Verification</h2>
      <p>Please enter the verification code sent to your mobile.</p>
      <input
        type="text"
        placeholder="Verification Code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleFinishTransaction}>Finish Transaction</button>
      <p className="verification-status">{verificationStatus}</p>
    </div>
  );
};

export default PaymentVerification;
