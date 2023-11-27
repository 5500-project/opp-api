import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignup";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Use Routes instead of Switch */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
