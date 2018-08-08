var Test = artifacts.require("./TestContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Test);
};
