import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractABI from '../../ABI_contract/contracts/FakeBAYC.json';
import './fakeBayc.css';

const FakeBayc = () => {
  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [metadata, setMetadata] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenIdState, setTokenIdState] = useState('');
  const [account, setAccount] = useState('');

  const contractAddress = '0x1dA89342716B14602664626CD3482b47D5C2005E'; // Adresse de votre contrat
  const web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(contractABI.abi, contractAddress);

  useEffect(() => {
    const init = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const networkId = await web3.eth.net.getId();
        if (networkId !== 11155111) { // ID du réseau Sepolia
          setErrorMessage('Veuillez vous connecter au réseau Sepolia.');
          return;
        }
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const fetchedName = await contractInstance.methods.name().call();
        const fetchedTotalSupply = await contractInstance.methods.totalSupply().call();

        setName(fetchedName);
        setTotalSupply(fetchedTotalSupply);
      } catch (error) {
        console.error('Erreur lors de la connexion à MetaMask:', error);
        setErrorMessage('Erreur lors de la connexion à MetaMask ou au réseau Sepolia.');
      }
    };

    init();
  }, []);

  async function getMetadata() {
    try {
      const tokenMetadataURI = await contractInstance.methods.tokenURI(tokenIdState).call();
      const response = await fetch(tokenMetadataURI);
      if (response.ok) {
        const data = await response.json();
        setMetadata(data);
      } else {
        setErrorMessage('Les métadonnées pour ce jeton n\'existent pas.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des métadonnées du jeton:', error);
      setErrorMessage('Erreur lors de la récupération des métadonnées du jeton');
    }
  }

  async function ClaimBAYC() {
    try {
      // Appel à la fonction du contrat pour réclamer un nouveau jeton
      await contractInstance.methods.claimAToken().send({ from: account });
      // Mettre à jour les informations après la réclamation du jeton
      await getMetadata();
    } catch (error) {
      console.error('Erreur lors de la réclamation du jeton:', error);
      setErrorMessage('Erreur lors de la réclamation du jeton');
    }
  }

  return (
    <div className="centered-container">
      <div className="fake-bayc-container">
        <h1>Fake BAYC</h1>
        <div className="info-section">
          <p className="info">Nom : {name}</p>
          <p className="info">Approvisionnement Total : {totalSupply}</p>
        </div>

        <button className="claim-button" onClick={ClaimBAYC}>Réclamer BAYC</button>

        <form onSubmit={(e) => { e.preventDefault(); getMetadata(); }}>
          <input
            className="token-input"
            type="text"
            value={tokenIdState}
            onChange={(e) => setTokenIdState(e.target.value)}
            placeholder="Numéro de jeton"
          />
          <input className="submit-button" type="submit" value="Soumettre" />
        </form>

        {errorMessage ? <p className="error-message">{errorMessage}</p> : null}

        {metadata.image ? (
          <div className="image-container">
            <img src={metadata.image} alt="NFT" className="nft-image" />
            {/* Vous pouvez également afficher d'autres attributs ici */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FakeBayc;
