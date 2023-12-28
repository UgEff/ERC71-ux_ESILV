// web3.js
import Web3 from 'web3';

export const connectToMetamask = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return new Web3(window.ethereum);
    } catch (error) {
      throw new Error('User denied account access');
    }
  } else if (window.web3) {
    return new Web3(window.web3.currentProvider);
  } else {
    throw new Error('No Ethereum provider detected');
  }
};

export default connectToMetamask;