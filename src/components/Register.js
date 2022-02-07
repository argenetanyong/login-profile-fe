import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import axios from "axios";
import config from "../config.json";
import jwtDecode from "jwt-decode";

function Register(props) {
  const [componentStatus, setComponentStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [nameError, setNameError] = useState();
  const [cityError, setCityError] = useState();
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [cityErrorMsg, setCityErrorMsg] = useState("");

  const schema = {
    username: Joi.string().max(50).required().email().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
    name: Joi.string().min(3).max(25).required().label("Name"),
    city: Joi.string().min(3).max(25).required().label("City"),
  };

  useEffect(() => {
    setComponentStatus("ready");
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      props.history.replace("/profile");
    } catch (error) {}
  }, []);

  useEffect(() => {
    validator(username, schema.username, setUsernameError, setUsernameErrorMsg);
  }, [username]);

  useEffect(() => {
    validator(password, schema.password, setPasswordError, setPasswordErrorMsg);
  }, [password]);

  useEffect(() => {
    validator(name, schema.name, setNameError, setNameErrorMsg);
  }, [name]);

  useEffect(() => {
    validator(city, schema.city, setCityError, setCityErrorMsg);
  }, [city]);

  const validator = (data, schemaData, fn1, fn2) => {
    if (componentStatus === "ready") {
      const result = Joi.validate(data, schemaData, {
        abortEarly: false,
      });
      if (result.error === null) {
        fn1(false);
      } else {
        fn1(true);
        fn2(result.error["details"][0].message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await axios.post(config.apiEndpoint, {
        username: username,
        password: password,
        name: name,
        city: city,
      });
      localStorage.setItem("token", response.headers["x-auth-token"]);
      //props.history.replace("/profile");
      //props.history.push("/profile");
      window.location = "/profile";
    } catch (er) {
      //console.log("er.response BE-", er.response.data);
      alert(er.response.data);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    //console.log("handleRegister CLICKED");
  };

  const handleChange = (e) => {
    if (e.currentTarget.name === "username") {
      setUsername(e.currentTarget.value);
    }
    if (e.currentTarget.name === "password") {
      setPassword(e.currentTarget.value);
    }
    if (e.currentTarget.name === "name") {
      setName(e.currentTarget.value);
    }
    if (e.currentTarget.name === "city") {
      setCity(e.currentTarget.value);
    }
  };

  const buttonStatusHandler = () => {
    if (
      usernameError === undefined ||
      passwordError === undefined ||
      nameError === undefined ||
      cityError === undefined
    ) {
      return true;
    } else if (
      usernameError === true ||
      passwordError === true ||
      nameError === true ||
      cityError === true
    ) {
      return true;
    }
    return false;
  };

  const handleBack = async (e) => {
    e.preventDefault();
    //window.location = "/";
    props.history.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Register</h1>

        <div className="form-group">
          <label htmlFor="name"> Name </label>
          <input
            autoFocus
            value={name}
            onChange={handleChange}
            id="name"
            name="name"
            type="text"
            className="form-control"
          />
          {nameError === true && (
            <div className="alert alert-danger"> {nameErrorMsg}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city"> City </label>
          <input
            value={city}
            onChange={handleChange}
            id="city"
            name="city"
            type="text"
            className="form-control"
          />
          {cityError === true && (
            <div className="alert alert-danger"> {cityErrorMsg}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="username"> Username/Email </label>
          <input
            value={username}
            onChange={handleChange}
            id="username"
            name="username"
            type="text"
            className="form-control"
          />
          {usernameError === true && (
            <div className="alert alert-danger"> {usernameErrorMsg}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password </label>
          <input
            value={password}
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
            className="form-control"
          />
          {passwordError === true && (
            <div className="alert alert-danger"> {passwordErrorMsg} </div>
          )}
        </div>

        <button
          onClick={handleBack}
          className="btn btn-primary register__backBtn"
        >
          Back
        </button>

        <button disabled={buttonStatusHandler()} className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
