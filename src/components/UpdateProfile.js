import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import jwtDecode from "jwt-decode";
import axios from "axios";
import config from "../config.json";
import _ from "lodash";

function UpdateProfile(props) {
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

  const [user, setUser] = useState("");

  useEffect(() => {
    setComponentStatus("ready");
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtDecoded = jwtDecode(jwt);
      const { data } = await axios.get(
        config.apiEndpoint + "/" + jwtDecoded._id
      );
      if (!_.isEmpty(data)) {
        setUser(data);
        setName(data.name);
        setUsername(data.username);
        setCity(data.city);
        setPassword(data.password);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (componentStatus === "ready") {
      validator(
        username,
        schema.username,
        setUsernameError,
        setUsernameErrorMsg
      );
    }
  }, [username]);

  useEffect(() => {
    if (componentStatus === "ready") {
      validator(
        password,
        schema.password,
        setPasswordError,
        setPasswordErrorMsg
      );
    }
  }, [password]);

  useEffect(() => {
    if (componentStatus === "ready") {
      validator(name, schema.name, setNameError, setNameErrorMsg);
    }
  }, [name]);

  useEffect(() => {
    if (componentStatus === "ready") {
      validator(city, schema.city, setCityError, setCityErrorMsg);
    }
  }, [city]);

  const schema = {
    username: Joi.string().min(3).max(25).required().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
    name: Joi.string().min(3).max(25).required().label("Name"),
    city: Joi.string().min(3).max(25).required().label("City"),
  };

  const validator = (data, schemaData, fn1, fn2) => {
    const result = Joi.validate(data, schemaData, {
      abortEarly: false,
    });
    if (result.error === null) {
      fn1(false);
    } else {
      fn1(true);
      fn2(result.error["details"][0].message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await axios.put(config.apiEndpoint + "/" + user._id, {
        username: username,
        password: password,
        name: name,
        city: city,
      });
      window.location = "/profile";
    } catch (er) {
      alert(er.response.data);
    }
  };

  const handleSubmitPatch = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await axios.patch(config.apiEndpoint + "/" + user._id, {
        username: username,
        name: name,
        city: city,
      });
      window.location = "/profile";
    } catch (er) {
      alert("er.response.data");
    }
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
    props.history.push("/profile");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    //window.location = "/";
    props.history.push("/change-password");
  };

  return (
    <div>
      <form onSubmit={handleSubmitPatch} className="register-form">
        <h1>Update Profile</h1>

        <div className="form-group">
          <label htmlFor="name"> Name </label>
          <input
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
          <label htmlFor="username"> Username </label>
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

        {/*  <div className="form-group">
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
        </div> */}
        <div>
          <button
            onClick={handleBack}
            className="btn btn-primary updateProfile__backBtn"
          >
            Back
          </button>
          <button
            disabled={buttonStatusHandler()}
            className="btn btn-primary updateProfile__saveBtn"
          >
            Save Profile
          </button>
        </div>
        <button
          onClick={handleChangePassword}
          className="btn btn-primary updateProfile__changePwBtn"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
