import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage"

import userService from "./utils/userService";

function App() {

  const [user, setUser] = useState(userService.getUser());
  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }


  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
    </Routes>
  );
}

export default App;
