import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer  = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword:'', message:''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    //we dont set transaction o=count to zero beacuse it will be reset everytime we refresh the browser so we use localStorage
    const [transactions, setTransactions] = useState([]);
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]:e.target.value}));
    }
    //used this!!! 

    const getAllTransactions = async () => {
        try{
            if(!ethereum) return alert("pls install metamask");
            const transactionContract=getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            setTransactions(structuredTransactions);
            console.log(availableTransactions);
        } catch(error) {
            console.log(error);
        }
    }


    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert("pls install metamask");
            //request account
            const accounts = await ethereum.request({method: 'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log('No account found');
            }
        //console.log(accounts)
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
        
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract=getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (error) {
            console.log(error);
            //throw new Error("No ethereum object.");
        }
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("pls install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch(error) {
            console.log("error");

        }
    }

    const sendTransaction = async() => {
        try{
            if(!ethereum) return alert("pls install metamask");
            const {addressTo, amount, keyword, message} = formData;
            //values reieved from react from  
            const transactionContract=getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            //parse hexadecimal to gwei
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,

                }]
            });
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();  
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`)
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch(error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }
 
    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);
    
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}