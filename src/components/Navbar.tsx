import "../css/Navbar.css";

interface propsType {
    tokens: Object,
    connectWallet: any,
    disconnectWallet: any,
    account: string | undefined,
}

export default function Navbar(props: propsType) {

    return (
        <nav className="nav-root">
            <ul>
                <li>
                    Home
                </li>
            </ul>

            {
                props.account ?
                    <button className="login-btn" id="login-btn" onClick={props.disconnectWallet} >Disconnect</button> :
                    <button className="login-btn" id="login-btn" onClick={props.connectWallet}>Connect Wallect</button>
            }

        </nav>
    )
}