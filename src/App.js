import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Home from "./components/Home";
import UpdateProfile from "./components/UpdateProfile";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import "./App.css";
import DeleteProfile from "./components/DeleteProfile";

function App() {
  const [user, setUser] = useState("");
  const [componentStatus, setComponentStatus] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (error) {}
  }, []);

  return (
    <div className="App">
      <NavBar user={user} />
      <div className="content">
        <Switch>
          <Route path="/update-profile" component={UpdateProfile} />
          <Route path="/profile" component={Profile} />
          {/* <Route
            path="/profile"
            render={(props) => (
              <Profile
                user={user}
                {...props}
              />
            )}
          />
          <Route
            path="/update-profile"
            render={(props) => (
              <UpdateProfile
                {...props}
              />
            )}
          /> */}
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/delete" component={DeleteProfile} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
