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
import { allToekns } from './utils/tokens';
import { resolve } from 'node:path/win32';
import { ethers } from "ethers";

function App() {
  let web3: any;
  let provider: any;
  const [tokens, setTokens] = useState<Object>([]);
  const [account, setAccount] = useState<string | undefined>();
  interface token {
    symbol: string,
    logoURI: string,
    address: string,
    decimals: number,
    name: string,
  };
  const t: token = {
    symbol: '',
    logoURI: '',
    address: '',
    decimals: 0,
    name: '',
  };
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

  const [chainId, setChainId] = useState<number>(56);
  //异步获取tokens信息
  useEffect(() => {
    axios.get('https://tokens.1inch.io/v1.1/' + chainId)
      .then(function (response) {
        // handle success

        setTokens(response.data);
        setFromSelect(response.data['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee']);


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }, []);

  // useEffect(() => {
  //   setTokens(allToekns.EthereumTokens)
  //   setFromSelect(allToekns.EthereumTokens['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'])
  //   console.log(tokens)
  // }, [allToekns])

  useEffect(() => {
    console.log(account);
  }, [account]);

  const doSwap = () => {
    // console.log(Number(fromAmount) * 10 ** fromSelect.decimals)
    // axios.get('https://api.1inch.io/v4.0/1/swap', {
    //   params: {
    //     fromTokenAddress: fromSelect.address,
    //     toTokenAddress: toSelect.address,
    //     amount: Number(fromAmount) * 10 ** fromSelect.decimals,
    //     fromAddress: account,
    //     slippage: 1,
    //   }
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const ZERO_EX_ADDRESS = '0xdef1c0ded9bec7f1a1670819833240f027b25eff';

    const params = {
      sellToken: toSelect.address,
      buyToken: fromSelect.address,
      // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.    
      sellAmount: Number(fromAmount) * 10 ** fromSelect.decimals,
      takerAddress: account,
    }
    let abi
    console.log(`https://api.etherscan.io/api?module=contract&action=getabi&address=${toSelect.address}&apikey=YourApiKeyToken`)
    axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=0xdef1c0ded9bec7f1a1670819833240f027b25eff&apikey=YourApiKeyToken`)
      .then(function (response) {
        abi = response.data.result
        // console.log(web3)
        // const dai = new web3.eth.Contract(abi, fromSelect.address);
        // console.log(dai);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {

    const getQuote = (fromTokenAddress: string, toTokenAddress: string, amount: string) => {
      let chain
      switch (chainId) {
        case 1:
          chain = '';
          break;
        case 56:
          chain = 'bsc.';
          break;
        case 10:
          chain = 'optimism.';
          break;
        case 43114:
          chain = 'avalanche.';
          break;
        case 137:
          chain = 'polygon.';
          break;
        default:
          break;
      }
      // axios.get('https://api.1inch.io/v4.0/56/quote', {
      axios.get(`https://${chain}api.0x.org/swap/v1/quote?`, {
        params: {
          // fromTokenAddress: fromTokenAddress,
          // toTokenAddress: toTokenAddress,
          // amount: amount,
          sellToken: fromTokenAddress,

          buyToken: toTokenAddress,
          sellAmount: amount,
        }
      })
        .then(function (response) {
          if (currentInput === 'from')
            setToAmount((response.data.buyAmount / 10 ** toSelect.decimals).toString())
          else
            setFromAmount((response.data.buyAmount / 10 ** toSelect.decimals).toString())
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (toSelect.address !== '' && Number(fromAmount) > 0 && currentInput === 'from') {
      getQuote(fromSelect.address, toSelect.address, (Number(fromAmount) * 10 ** fromSelect.decimals).toString());
    }
    else if (toSelect.address && currentInput === 'to') {
      getQuote(toSelect.address, fromSelect.address, (Number(toAmount) * 10 ** toSelect.decimals).toString());
    }

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
        darkMode: true // Optional. Use dark theme, defaults to false
      }
    }
  };
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    providerOptions // required
  });

  const conso = () => {
    console.log(web3);
    console.log(account);
  };

  useEffect(() => {
    console.log("provider undefined!");
  }, [provider]);
  const connectWallet = async () => {

    try {
      provider = await web3Modal.connect();

      // provider = new ethers.providers.Web3Provider(instance);
      // const signer = provider.getSigner();
      // const accounts = await signer.getAddress();
      // console.log(accounts);
      web3 = new Web3(provider);
      // await web3.eth.getAccounts().then((acc: any) => { setAccount(acc) });
      // const network = await web3.eth.net.getId();
      // if (accounts) setAccount(accounts);
    } catch (error) {
      console.log("errpr:", error)
    }

  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    setAccount('')
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: any) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId: any) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = (error: any) => {
        console.log("disconnect", error);
        disconnectWallet();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);



  const [counts, setCounts] = useState<number>(0);

  const increase = () => {
    setCounts(counts + 1);
  }


  //传入子组件的props
  const trade = {
    tokens: tokens,
    setTokens: setTokens,
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
    chainId: chainId,
    setChainId: setChainId,
    doSwap: doSwap,
  }
  return (
    <div className="app-root">
      <button onClick={conso}>console</button>
      <button onClick={increase}>increase</button>
      <span>{counts}</span>
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
