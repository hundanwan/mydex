import Web3 from "web3";
import axios from "axios";

const chainId = 56;
const web3RpcUrl = 'https://bsc-dataseed.binance.org';
const walletAddress = '0x...xxx'; // Set your wallet address
const privateKey = '0x...xxx'; // Set private key of your wallet. Be careful! Don't share this key to anyone!

const swapParams = {
    fromTokenAddress: '0x111111111117dc0aa78b770fa6a738034120c302', // 1INCH
    toTokenAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // DAI
    amount: '100000000000000000',
    fromAddress: 'YOUR_WALLET_ADDRESS',
    slippage: 1,
    disableEstimate: false,
    allowPartialFill: false,
};

const getQuote = (fromTokenAddress: string, toTokenAddress: string, amount: string) => {
    let data = 1
    axios.get('https://api.1inch.io/v4.0/56/quote', {
        params: {
            fromTokenAddress: fromTokenAddress,
            toTokenAddress: toTokenAddress,
            amount: amount,
        }
    })
        .then(function (response) {
            console.log(response.data)
            data = response.data
        })
        .catch(function (error) {
            console.log(error);
        });
    return data
}

const doSwap = (fromTokenAddress: string, toTokenAddress: string, amount: string, fromAddress: string, slippage: number = 1) => {
    axios.get('https://api.1inch.io/v4.0/56/swap', {
        params: {
            fromTokenAddress: fromTokenAddress,
            toTokenAddress: toTokenAddress,
            amount: amount,
            slippage: slippage,
        }
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getQuote, doSwap }