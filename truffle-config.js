require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "55094ac1f57f4ffaa2be7fc764a14d15";
var mnemonic = "traffic bracket depth radar labor double knock ritual ozone ball crisp dune";

module.exports = {
  networks: {
    inhouse: {
      host: "172.17.2.166",
      port: 8545,
      network_id: "*",
      gas:4712388,
      from:"0x4b66407178bca21b0bf2a4d5c7d92018ba968eb3",
      solc: { optimizer: { enabled: true, runs: 200 } }
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" ,
      gas:4712388,
      from: "0x7db2dbf23d8b8592b6a9389655ede96e8f01b9b6"
      // solc: { optimizer: { enabled: true, runs: 200 } }
    },
    test: {
      host: "172.17.2.50",
      port: 8545,
      network_id: "*" 
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3
    }
  }
};
