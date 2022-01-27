import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { CardHeader } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./PendingItems.css";
//import axios from 'axios';

import ccfTokenAbi from "../../abi/ccf-abi";

const Web3 = require("web3");
const tokenAddress = "0xdA203998849c654a4fA45abA656896f900A4F19D";

const PendingItems = (props) => {
  const refundActionSeller = () => {
    const provider = new Web3(window.web3.currentProvider);
    const DraqleContract = new provider.eth.Contract(ccfTokenAbi, tokenAddress);

    DraqleContract.methods
      .refundByAdminToSeller(props.pendingId)
      .send({ from: props.cur_Account.toString() })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const refundActionBuyer = () => {
    const provider = new Web3(window.web3.currentProvider);
    const DraqleContract = new provider.eth.Contract(ccfTokenAbi, tokenAddress);

    DraqleContract.methods
      .refundByAdminToBuyer(props.pendingId)
      .send({ from: props.cur_Account.toString() })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionButton =
    props.refundedBySeller === false ? (
      <div>
        <Button
          style={{
            width: "100px",
            backgroundColor: "tomato",
            color: "white",
          }}
          onClick={refundActionBuyer}
        >
          Refund to Buyer
        </Button>
        <Button
          style={{
            width: "100px",
            backgroundColor: "tomato",
            color: "white",
          }}
          onClick={refundActionSeller}
        >
          Refund to Seller
        </Button>
      </div>
    ) : null;

  return (
    <div className="wrapper">
      <div
        style={{
          width: "100px",
        }}
      >
        {props.productId}
      </div>
      <div
        style={{
          width: "100px",
        }}
      >
        <p
          style={{
            overflowWrap: "break-word",
          }}
        >
          {props.productOwner}
        </p>
      </div>
      <div
        style={{
          width: "100px",
        }}
      >
        <p
          style={{
            overflowWrap: "break-word",
          }}
        >
          {props.depoAmount}
        </p>
      </div>
      {actionButton}
    </div>
  );
};
export default PendingItems;
