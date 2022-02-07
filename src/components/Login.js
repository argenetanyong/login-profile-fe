import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import axios from "axios";

function Login(props) {
  const apiEndpoint = "https://infinite-retreat-75327.herokuapp.com/api/auth";
  const [componentStatus, setComponentStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const schema = {
    username: Joi.string().min(3).max(25).required().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
  };

  useEffect(() => {
    setComponentStatus("ready");
  }, []);

  useEffect(() => {
    if (componentStatus === "ready") {
      validator(
        username,
        schema.username,
        setUsernameError,
        setUsernameErrorMsg
      );
      //validator2(errors, schema);
      //validateUsername()
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
      //validatePassword();
    }
  }, [password]);

  const validator = (data, schemaData, fn1, fn2) => {
    const result = Joi.validate(data, schemaData, {
      abortEarly: false,
    });
    if (result.error === null) {
      fn1(false);
    } else {
      fn1(true);
      fn2(result.error["details"][0].message);

      /* console.log("result.error[message]", result.error["message"][0]);
      console.log("result.error[details]", result.error["details"][0].message); 
      if (data === username) {
        setUsernameErrorMsg(result.error["details"][0].message);
      }
      if (data === password) {
        setPasswordErrorMsg(result.error["details"][0].message);
      }*/
    }
  };

  /* const validateUsername = () => {
    const result = Joi.validate(username, schema.username, {
      abortEarly: false,
    });
    if (result.error === null) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
  };
  const validatePassword = () => {
    const result = Joi.validate(password, schema.password, {
      abortEarly: false,
    });
    if (result.error === null) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    //let response;
    try {
      const { data: jwt } = await axios.post(apiEndpoint, {
        username: username,
        password: password,
      });
      //console.log("response BE-", response.data);
      localStorage.setItem("token", jwt);
      //props.history.push("/");
      window.location = "/profile";
    } catch (er) {
      //console.log("er.response BE-", er.response.data);
      alert(er.response.data);
    }
  };

  const handleChange = (e) => {
    if (e.currentTarget.name === "username") {
      setUsername(e.currentTarget.value);
    }
    if (e.currentTarget.name === "password") {
      setPassword(e.currentTarget.value);
    }
  };

  const buttonStatusHandler = () => {
    if (usernameError === undefined || passwordError === undefined) {
      return true;
    } else if (usernameError === true || passwordError === true) {
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
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username"> Username </label>
          <input
            autoFocus
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

        <button onClick={handleBack} className="btn btn-primary login__backBtn">
          Back
        </button>

        <button disabled={buttonStatusHandler()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
