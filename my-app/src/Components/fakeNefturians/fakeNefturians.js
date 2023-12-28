// fakeNefturians.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import fakeNefturiansABI from '../../ABI_contract/contracts/FakeNefturians.json'; // Mettez à jour avec le chemin correct de l'ABI
import '../fakeNefturians/fakeNefturians.css';

const FakeNefturians = () => {
    const [tokenPrice, setTokenPrice] = useState('');
    const contractAddress = '0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED';
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(fakeNefturiansABI.abi, contractAddress);

    useEffect(() => {
        const fetchTokenPrice = async () => {
            const price = await contract.methods.tokenPrice().call();
            setTokenPrice(web3.utils.fromWei(price, 'ether'));
        };

        fetchTokenPrice();
    }, []);

    const buyToken = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.buyAToken().send({ from: accounts[0], value: tokenPrice });
    };

    return (
    <div className="fake-nefturians-container">
        <h1>Fake Nefturians</h1>
        <p>Prix du token : {tokenPrice} ETH</p>
        <button className="fake-nefturians-button" onClick={buyToken}>Acheter un Token</button>
    </div>
    );
};

export default FakeNefturians;
