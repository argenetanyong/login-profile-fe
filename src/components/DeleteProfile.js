import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Joi from "joi-browser";
import axios from "axios";
import config from "../config.json";

function DeleteProfile(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (error) {}
  }, []);

  const handleBack = async (e) => {
    e.preventDefault();
    props.history.push("/profile");
  };

  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(config.apiEndpoint + "/" + user._id);
      localStorage.removeItem("token");
      window.location = "/";
    } catch (er) {
      alert("Something failed while deleting your profile!");
    }
    //
    //localStorage.removeItem("token");
  };

  return (
    <div className="delete-page">
      <h1>You are about to delete your profile.</h1>
      <p>This can't be undone.</p>

      <button onClick={handleBack} className="btn btn-primary">
        Back
      </button>
      <button
        onClick={handleDeleteProfile}
        className="btn btn-danger delete-profile-btn"
      >
        Delete Profile
      </button>
    </div>
  );
}

export default DeleteProfile;
