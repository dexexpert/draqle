import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardHeader } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import './folio.css'
import axios from 'axios';

import ccfTokenAbi from '../abi/ccf-abi';

const Web3 = require('web3');
const tokenAddress = "0xb069F05c00Eabc9863b80659374283fB41957eAC";

class ConWalletBoard extends Component {
  constructor() {
    super();
    this.state = {
      walletConnected: false,
      myBalance: "0",
      isLoadingData: false,
      currentPrice: "0",
      currentAccountAddress: "0"
    }
  }
  togglePanel = (e) => {
    this.setState({ isLoadingData: e });
  }
  setCurrentPrice = (e) => {
    this.setState({ currentPrice: e });
  }
  setBalance = (e) => {
    this.setState({ myBalance: e });
  }
  setWalletState = (e) => {
    this.setState({ walletConnected: e });
  }
  ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      this.setWalletState(true);
      return true;
    }
    return false;
  }
  getAccount = async () => {
    var accounts, account;
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    return account;
  }
  getBalanceValue = async () => {
    const ids = "cross-chain-farming";
    const vs_currencies = "usd";
    this.togglePanel(true);
    await axios.get("https://api.coingecko.com/api/v3/simple/price", { params: { "ids": ids, "vs_currencies": vs_currencies } })
      .then(res => {
        this.togglePanel(false);
        this.setCurrentPrice(res.data[ids].usd);
        console.log(this.state.currentPrice);
      })
      .catch(err => {
        this.togglePanel(false);
        console.log(err);
      });

  }
  async getBalance(userAddress) {
    const provider = new Web3(window.web3.currentProvider);
    var ccfContract = new provider.eth.Contract(ccfTokenAbi, tokenAddress);

    this.togglePanel(true);
    await ccfContract.methods.balanceOf(userAddress).call().then(res => {
      console.log(res);
      this.togglePanel(false);
      this.setBalance(res);
    }).catch(err => {
      this.togglePanel(false);
      console.log(err);
    });
  }
  clickConnectWallet = () => {
    this.getAccount().then(res => {
      console.log(res);
      const _currentAccount = res;
      this.setWalletState(true);
      this.setState({ currentAccountAddress: _currentAccount.toString() });
      this.getBalance(_currentAccount.toString());
      if (this.state.currentPrice === undefined || this.state.currentPrice.toString === "" || this.state.currentPrice === "0")
        this.getBalanceValue();
    }).catch(err => console.log(err));
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }

  render() {
    return (
      <div className="container-fluid">
        {(this.state.walletConnected === false) ? (
          <div className="container">
            <h1 className="portfolio_header">
              My Portfolio
            </h1>
            <div className="btn_wallet_container">
              <Button className="btn_wallet" onClick={this.clickConnectWallet}>
                Connect Wallet
              </Button>
            </div>
          </div>
        ) : (
            <div className="row">
              <div className="col-xs-12 col-sm-6  card-container">
                {SimpleCard({ headerName: "BALANCE ($CCF)", myAddr: this.state.currentAccountAddress.toString(), title: "Your current token amount", content: this.state.myBalance + "$CCF" })}
              </div>
              <div className="col-xs-12 col-sm-6  card-container">
                {SimpleCard({ headerName: "BALANCE Value ($USDT)", myAddr: this.state.currentAccountAddress.toString(), title: "Real value in $USD", content: Number(this.state.myBalance) * Number(this.state.currentPrice) + "$USD" })}
              </div>
            </div>
          )}
        <div className="loadingPanel">
        </div>
      </div>
    );
  }
}

export default ConWalletBoard;