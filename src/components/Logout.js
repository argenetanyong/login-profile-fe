import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/";
  });

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}

export default Logout;
