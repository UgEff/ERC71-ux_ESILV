import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import fakeNefturiansABI from '../../ABI_contract/contracts/FakeNefturians.json';

const FakeNefturiansUser = () => {
    const [tokens, setTokens] = useState([]);
    const { userAddress } = useParams();
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(fakeNefturiansABI.abi, '0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED');

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const tokenCount = await contract.methods.balanceOf(userAddress).call();
                const tokenIds = [];
                for (let i = 0; i < tokenCount; i++) {
                    const tokenId = await contract.methods.tokenOfOwnerByIndex(userAddress, i).call();
                    tokenIds.push(tokenId);
                }
                setTokens(tokenIds);
            } catch (error) {
                console.error('Erreur lors de la récupération des tokens:', error);
            }
        };

        if (userAddress) {
            fetchTokens();
        }
    }, [userAddress]);

    return (
        <div>
            <h1>Tokens de {userAddress}</h1>
            <ul>
                {tokens.map((tokenId, index) => (
                    <li key={index}>Token ID: {tokenId}</li>
                ))}
            </ul>
        </div>
    );
};

export default FakeNefturiansUser;
