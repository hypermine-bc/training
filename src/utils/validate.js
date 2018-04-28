
//Metamask validation
export const validateMetaMaskConnections = async(web3) => {
  debugger
  //checking if metamask is installed or notdebugger
  console.log('checking if metamask is installed or not');
  if(typeof web3 == 'undefined' || web3 == null || typeof web3.currentProvider.isMetaMask == 'undefined'){
    alert('Metamask not installed');  
    return false
  }

  //checking conneted to Pramati network or not
  // console.log('checking conneted to Pramati network or not...');
  // if(web3.currentProvider.publicConfigStore._state.networkVersion.toString() != "9876") {
  //   console.log('Not connected to Our network');
  //   return false
  // }

  //checking if user has unlocked wallet or not
  console.log('checking if user has unlocked wallet or not...');
  web3.eth.getAccounts(  (err, accounts) => {
    if (err != null) console.error("An error occurred: "+err);
    else if (accounts.length == 0){
      alert('checking if user has unlocked wallet or not...');
    return false
    }
  });
}

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

