require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "55094ac1f57f4ffaa2be7fc764a14d15";
var mnemonic = "traffic bracket depth radar labor double knock ritual ozone ball crisp dune";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey);
      },
      network_id: '3',
      gas:4612388,
    }
  }
};
