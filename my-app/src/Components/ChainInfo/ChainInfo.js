import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import connectToMetamask from './../../web3';
import './ChainInfo.css';

const ChainInfo = () => {
  const [web3, setWeb3] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await connectToMetamask();
        setWeb3(web3Instance);

        const networkId = await web3Instance.eth.net.getId();
        setChainId(networkId.toString());

        const latestBlockNumber = await web3Instance.eth.getBlockNumber();
        setBlockNumber(latestBlockNumber.toString());

        const accounts = await web3Instance.eth.getAccounts();
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };

    init();
  }, [navigate]);

  // Fonction pour revenir en arrière lorsque le bouton est cliqué
  const goBack = () => {
    navigate(-1); // Cette ligne permet de revenir en arrière d'une page dans l'historique du navigateur
  };

  return (
    <div className='gray-container'>
      <div className="container">
        <h1>Chain Information</h1>
        <ul>
          <li>Chain Id: {chainId}</li>
          <li>Last Block Number: {blockNumber}</li>
          <li>User Address: {userAddress}</li>
        </ul>
        
        <button onClick={goBack}>Back Home</button>
      </div>
    </div>
  );
};

export default ChainInfo;
