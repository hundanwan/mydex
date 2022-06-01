import "../css/Navbar.css";

import Web3 from "web3";
import Web3Modal from "web3modal";
import { useEffect, useRef, useState } from "react";
interface propsType {
    tokens: Object,
    connectWallet: any,
    disconnectWallet: any,
}

export default function Navbar(props: propsType) {

    return (
        <nav className="nav-root">
            <ul>
                <li>
                    Home
                </li>
            </ul>
            {/* <div className="App">
                <button onClick={connectWallet}>获取钱包地址</button>
            </div> */}


            <button className="login-btn" id="login-btn" onClick={props.disconnectWallet} >Logout</button>
            <button className="login-btn" id="login-btn" onClick={props.connectWallet}>Login with MetaMask</button>

        </nav>
    )
}