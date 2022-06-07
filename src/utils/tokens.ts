import axios from 'axios'
const tokens = {
    EthereumTokens: {},
    BscTokens: {},
    PolygonTokens: {},
    OptimismTokens: {},
    AvalancheTokens: {}
}

//获取Eth链上tokens信息
axios.get('https://tokens.1inch.io/v1.1/1')
    .then(function (response) {
        tokens.EthereumTokens = response.data
    })
    .catch(function (error) {
        console.log(error);
    });
//获取Bsc链上tokens信息
axios.get('https://tokens.1inch.io/v1.1/56')
    .then(function (response) {
        tokens.BscTokens = response.data
    })
    .catch(function (error) {
        console.log(error);
    });
//获取Polygan链上tokens信息
axios.get('https://tokens.1inch.io/v1.1/137')
    .then(function (response) {
        tokens.PolygonTokens = response.data
    })
    .catch(function (error) {
        console.log(error);
    });

//获取Optimism链上tokens信息
axios.get('https://tokens.1inch.io/v1.1/10')
    .then(function (response) {
        tokens.OptimismTokens = response.data
    })
    .catch(function (error) {
        console.log(error);
    });
//获取Avalanche链上tokens信息
axios.get('https://tokens.1inch.io/v1.1/43114')
    .then(function (response) {
        tokens.AvalancheTokens = response.data
    })
    .catch(function (error) {
        console.log(error);
    });
export { tokens as allToekns }