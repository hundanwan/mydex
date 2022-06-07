import React, { useEffect, useState } from 'react'
import '../css/ChainBtn.css'
import axios from 'axios'
interface propsType {
    ChainId: number,
    setChainId: any,
    setTokens: any,
}
export default function ChainBtn(props: propsType) {

    //鼠标悬停打开链选择
    const [show, setShow] = useState<boolean>(false)
    const hoverHandler = () => {
        setShow(true)
    }
    const leaveHandler = () => {
        setShow(false)
    }

    //获取链图标

    const defaultTokenAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    const [EthTokens, setEthTokens] = useState<Array<Object>>()
    const [BscTokens, setBscTokens] = useState<Array<Object>>()
    const [PolyganTokens, setPolyganTokens] = useState<Object>()
    const [OptimismTokens, setOptimismTokens] = useState<Object>()
    const [AvalancheTokens, setAvalancheTokens] = useState<Object>()
    useEffect(() => {
        //获取Eth链上tokens信息
        axios.get('https://tokens.1inch.io/v1.1/1')
            .then(function (response) {
                setEthTokens(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        //获取Bsc链上tokens信息
        axios.get('https://tokens.1inch.io/v1.1/56')
            .then(function (response) {
                setBscTokens(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        //获取Polygan链上tokens信息
        axios.get('https://tokens.1inch.io/v1.1/137')
            .then(function (response) {
                setPolyganTokens(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

        //获取Optimism链上tokens信息
        axios.get('https://tokens.1inch.io/v1.1/10')
            .then(function (response) {
                setOptimismTokens(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        //获取Avalanche链上tokens信息
        axios.get('https://tokens.1inch.io/v1.1/43114')
            .then(function (response) {
                setAvalancheTokens(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])
    return (
        <div className='chain-btn-root' onMouseEnter={hoverHandler} onMouseLeave={leaveHandler}>
            <button className='chain-btn'>
                <span>Ethereum</span>

                <svg className="icon" id='select-chain-xiangxia' aria-hidden="true">
                    <use href="#icon-xiangxia"></use>
                </svg>
            </button>
            {
                show ?
                    <div className='chain-selector-container'>
                        <div className='chain-selector-modal'>
                            <div className='chain-selector-modal-item'>
                                {/* <img src={BscTokens} alt="" /> */}
                                BNB Chain
                            </div>
                            <div className='chain-selector-modal-item'>
                                Polygan
                            </div>
                            <div className='chain-selector-modal-item'>
                                Optimism
                            </div>
                            <div className='chain-selector-modal-item'>
                                Avalanche
                            </div>
                        </div>

                    </div> :
                    ''

            }

        </div>

    )
}
