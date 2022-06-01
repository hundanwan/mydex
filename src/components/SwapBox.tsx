import '../css/SwapBox.css'
import React from 'react'

interface propsType {
    tokens: Object,
    connectWallet: any,
    disconnectWallet: any,
    setCurrentSelectSide: any,
    openModal: any,
    fromSelect: any,
    fromAmount: string,
    setCurrentInput: any,
    setFromAmount: any,
    setToAmount: any,
    toSelect: any,
    toAmount: string,
}
export default function SwapBox(props: propsType) {

    const setModal = (side: string) => {
        props.setCurrentSelectSide(side)
        // console.log(props.currentSelectSide.side)
        props.openModal()
    }

    const fromAmountChange = (e: any) => {
        props.setCurrentInput("from")
        props.setFromAmount(e.target.value)

    }
    const toAmountChange = (e: any) => {
        props.setCurrentInput("to")
        props.setToAmount(e.target.value)
    }
    return (
        <div className='swapbox-root'>
            <header className='swap-header'>
                <span>Swap</span>
                <svg className="icon" aria-hidden="true">
                    <use href="#icon-shezhi"></use>
                </svg>
            </header>


            <div className='inputbox-root'>
                <div className='token-select' onClick={() => { setModal('from') }} >
                    <img src={props.fromSelect.logoURI} alt="" className='token-select-logo' />
                    <span className='token-select-symbol'>{props.fromSelect.symbol}</span>
                    <svg className="icon" aria-hidden="true">
                        <use href="#icon-xiangxia"></use>
                    </svg>
                </div>
                <input type="number" id='from_input' placeholder='amount' maxLength={18} value={props.fromAmount} onChange={(e) => { fromAmountChange(e) }} />

            </div>


            <div className='inputbox-root'>
                <div className='token-select' onClick={() => { setModal('to') }} >
                    {
                        props.toSelect.logoURI ?
                            <img src={props.toSelect.logoURI} alt="" className='token-select-logo' /> : ''
                    }
                    <span className='token-select-symbol'>{props.toSelect.symbol ? props.toSelect.symbol : 'Select Token'}</span>
                    <svg className="icon" aria-hidden="true">
                        <use href="#icon-xiangxia"></use>
                    </svg>
                </div>
                <input type="number" id='to_input' placeholder='amount' maxLength={18} value={props.toAmount} onChange={(e) => { toAmountChange(e) }} />
            </div>
            {/* <div className='gas-show'>
                <span>Estimated Gas:{props.estimatedGas}</span>

            </div>
            {
                props.isAuthenticated ? <button className='swap-btn' onClick={() => clickSwap()}>Swap</button> : <button className='swap-btn' onClick={() => { connect() }}>Connect Wallet</button>
            } */}
        </div>
    )
}
