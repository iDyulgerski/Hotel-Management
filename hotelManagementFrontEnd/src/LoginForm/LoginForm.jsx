import React, { Component, useState } from "react";
import "./LoginForm.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameOrEmailChange = (e) => {
    // Validation

    setUsernameOrEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    fetch("https://localhost:7153/api/User/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        usernameOrEmail: usernameOrEmail,
        password: password,
      }),
    })
      .then((response) => response.json()) // parse the response as JSON
      .then((data) => {
        if (data != null) {
          // check if user data is available
          console.log("login data for the user:", data);
          dispatch(setUser(data)); // dispatch the user to your store (if using Redux)

          // Save user data in localStorage
          localStorage.setItem("user", JSON.stringify(data)); // Store in localStorage

          navigate(`/home`); // navigate to the home page or dashboard
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      <h2>Welcome to our hotel management app!</h2>
      <form id="loginForm">
        <div className="form-group">
          <label htmlFor="usernameOrEmail">Username or Email</label>
          <input
            onChange={handleUsernameOrEmailChange}
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <Button type="primary" block={true} onClick={handleLogin}>
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
