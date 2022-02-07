import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function Home(props) {
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      props.history.replace("/profile");
    } catch (error) {}
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    //window.location = "/login";
    props.history.push("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    //window.location = "/register";
    props.history.push("/register");
  };

  return (
    <div className="home">
      <h1>Argene's Login and JWT Demo</h1>
      <div className="home">
        <button
          onClick={handleLogin}
          className="btn btn-primary home__loginBtn"
        >
          Login
        </button>
        <button onClick={handleRegister} className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;
