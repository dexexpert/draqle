import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <Link
        style={{
          backgroundColor: "tomato",
          color: "white",
          marginRight: "3rem",
        }}
        to="/buy"
      >
        Buyer
      </Link>

      <Link
        style={{
          backgroundColor: "tomato",
          color: "white",

          marginRight: "3rem",
        }}
        to="/sell"
      >
        Seller
      </Link>

      <Link
        style={{
          backgroundColor: "tomato",
          color: "white",
        }}
        to="/admin"
      >
        Admin
      </Link>
    </div>
  );
}

export default MainPage;
