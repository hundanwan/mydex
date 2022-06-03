import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios'
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import SwapBox from './components/SwapBox';
import Modal from './components/Modal'

function App() {

  const [tokens, setTokens] = useState<Object>([]);
  const [account, setAccount] = useState<string | undefined>();
  const [network, setNetwork] = useState();
  interface token {
    symbol: string,
    logoURI: string,
    address: string,
    decimals: number,
    name: string,
  }
  const t: token = {
    symbol: '',
    logoURI: '',
    address: '',
    decimals: 0,
    name: '',
  }
  const [fromSelect, setFromSelect] = useState<token>(t);

  const [toSelect, setToSelect] = useState<token>(t);
  const [currentSelectSide, setCurrentSelectSide] = useState<string>('');

  const [fromAmount, setFromAmount] = useState<string>('');

  const [toAmount, setToAmount] = useState<string>('');

  const [currentInput, setCurrentInput] = useState<string>('')
  //定义打开、关闭选择token的modal
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  //异步获取tokens信息
  useEffect(() => {
    axios.get('https://api.1inch.io/v4.0/1/tokens')
      .then(function (response) {
        // handle success
        setTokens(response.data.tokens)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  useEffect(() => {
    console.log(Number(fromAmount), toAmount)
  }, [fromAmount, toAmount]);


  const providerOptions = {
    binancechainwallet: {
      package: true
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "b17c8d5da72d4109b33ebc668b9468c1" // required
      }
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "My Awesome App", // Required
        infuraId: "b17c8d5da72d4109b33ebc668b9468c1", // Required
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: 1, // Optional. It defaults to 1 if not provided
        darkMode: false // Optional. Use dark theme, defaults to false
      }
    }
  };
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  const connectWallet = async () => {

    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getId();
      if (accounts) setAccount(accounts[0]);
    } catch (error) {
      console.log("errpr:", error)
    }

  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
  };










  //传入子组件的props
  const trade = {
    tokens: tokens,
    connectWallet: connectWallet,
    disconnectWallet: disconnectWallet,
    openModal: openModal,
    closeModal: closeModal,
    fromSelect: fromSelect,
    setFromSelect: setFromSelect,
    toSelect: toSelect,
    setToSelect: setToSelect,
    currentSelectSide: currentSelectSide,
    setCurrentSelectSide: setCurrentSelectSide,
    fromAmount: fromAmount,
    setFromAmount: setFromAmount,
    toAmount: toAmount,
    setToAmount: setToAmount,
    currentInput: currentInput,
    setCurrentInput: setCurrentInput,
    account: account,
  }
  return (
    <div className="app-root">
      {
        modal ? (<Modal {...trade} ></Modal>) : ''
      }
      <header className="app-header">
        <Navbar {...trade}></Navbar>
      </header>
      <main className='app-main'>
        <SwapBox {...trade}></SwapBox>
      </main>
    </div>
  );
}

export default App;
