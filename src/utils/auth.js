import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setWeb3(data) {
	console.log('Setting web3 in localstorage')
  return localStorage.setItem('web3', data);
  // return Cookies.set('web3',JSON.stringify(token))
}

export function getWeb3(token) {
  return localStorage.getItem('web3') || 0;
}

export function removeToken() {
  localStorage.setItem('web3', '');
  return Cookies.remove(TokenKey)
}
