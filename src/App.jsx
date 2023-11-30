import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage"
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";

import userService from "./utils/userService";

function App() {

  const [user, setUser] = useState(userService.getUser());

  // 
  function logout() {
    userService.logout();
    setUser(null);
  }


  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }


  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/products"
        element={<ProductsPage />}
      />
      <Route
        path="/addProduct"
        element={<AddProductPage />}
      />


    </Routes>
  );
}

export default App;
