import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignup";
import PaymentMain from "./payment/PaymentMain";
import PaymentVerification from "./payment/PaymentProcess";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Use Routes instead of Switch */}
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/payment" element={<PaymentMain />} />
          <Route
            path="/payment-verification"
            element={<PaymentVerification />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
