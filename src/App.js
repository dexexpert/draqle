import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import ConWalletBoard from './Portfolio/ConWalletBoard';
import BuyerPanel from "./Buyer/Buyer";
import MainPage from "./MainPage/MainPage";
import SellerPanel from "./Seller/Seller";
import AdminPanel from "./Admin/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={MainPage} />
        <Route exact path="/buy" component={BuyerPanel} />
        <Route exact path="/sell" component={SellerPanel} />
        <Route exact path="/admin" component={AdminPanel} />
      </div>
    </Router>
  );
}

export default App;
