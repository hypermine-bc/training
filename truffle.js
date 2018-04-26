require('babel-register');
require('babel-polyfill');

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
      network_id: "*" 
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" 
    }
  }
};
