import "../css/Navbar.css";
import ChainBtn from "./ChainBtn";

interface propsType {
    tokens: Object,
    connectWallet: any,
    disconnectWallet: any,
    account: string | undefined,
    chainId: number,
    setChainId: any,
    setTokens: any,
}

export default function Navbar(props: propsType) {

    return (
        <nav className="nav-root">
            <ul>
                <li>
                    Home
                </li>
            </ul>

            <div className="nav-right">
                <ChainBtn ChainId={props.chainId} setChainId={props.setChainId} setTokens={props.setTokens}></ChainBtn>
                {
                    props.account ?
                        <button className="login-btn" id="login-btn" onClick={props.disconnectWallet} >Disconnect</button> :
                        <button className="login-btn" id="login-btn" onClick={props.connectWallet}>Connect Wallect</button>
                }

            </div>

        </nav>
    )
}