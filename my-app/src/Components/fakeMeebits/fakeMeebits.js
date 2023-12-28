import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import fakeMeebitsABI from './fakeMeebitsABI.json'; // Assurez-vous d'importer le bon ABI

const FakeMeebits = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [tokenId, setTokenId] = useState(2); // Choisir l'ID du token à mint
    const [isMinter, setIsMinter] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const networkId = await web3Instance.eth.net.getId();
                const contractAddress = '0xD1d148Be044AEB4948B48A03BeA2874871a26003'; // Remplacez par l'adresse de votre contrat
                const contractInstance = new web3Instance.eth.Contract(fakeMeebitsABI, contractAddress);
                setContract(contractInstance);

                const accounts = await web3Instance.eth.getAccounts();
                setAccount(accounts[0]);

                const isWhitelisted = await contractInstance.methods.whitelist(accounts[0]).call();
                setIsMinter(isWhitelisted);
            } catch (error) {
                console.error('Erreur lors de la connexion à MetaMask:', error);
            }
        };

        init();
    }, []);

    const mintToken = async () => {
        try {
            // Vérifier si l'utilisateur est autorisé à minter
            if (!isMinter) {
                console.error('Vous n\'êtes pas autorisé à minter des tokens.');
                return;
            }

            // Appeler la fonction mintAToken du contrat
            await contract.methods.mintAToken(tokenId).send({ from: account });
            console.log(`Token ${tokenId} minté avec succès.`);
        } catch (error) {
            console.error('Erreur lors de la minting du token:', error);
        }
    };

    return (
        <div>
            <h1>Fake Meebits</h1>
            <p>Adresse du compte connecté : {account}</p>
            {isMinter ? (
                <>
                    <p>Vous êtes autorisé à minter des tokens.</p>
                    <button onClick={mintToken}>Minter le token {tokenId}</button>
                </>
            ) : (
                <p>Vous n'êtes pas autorisé à minter des tokens.</p>
            )}
        </div>
    );
};

export default FakeMeebits;
