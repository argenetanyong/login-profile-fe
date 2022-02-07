import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "../config.json";
import _ from "lodash";

function Profile(props) {
  const [user, setUser] = useState("");

  /* useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (error) {
      console.log("JWT NOT DETECTED");
    }
  }, []); */

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      const { data } = await axios.get(config.apiEndpoint + "/" + user._id);
      if (!_.isEmpty(data)) {
        setUser(data);
      } else {
      }
    } catch (error) {}
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    props.history.push("/delete");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    props.history.push("/update-profile");
    //window.location = "/update-profile";
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>

      <div className="form-group">
        <label htmlFor="name"> Name </label>
        <p>
          <b> {user.name} </b>
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="city"> City </label>
        <p>
          <b> {user.city}</b>
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="username"> Username/Email </label>
        <p>
          <b>{user.username} </b>
        </p>
      </div>

      {/* <div className="form-group">
        <label htmlFor="password"> Password </label>
      </div> */}

      <button onClick={handleUpdateProfile} className="btn btn-primary">
        Update Profile
      </button>
      <button
        onClick={handleDelete}
        className="btn btn-danger delete-profile-btn"
      >
        Delete
      </button>
    </div>
  );
}

export default Profile;
