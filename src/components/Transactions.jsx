import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";
import './Transactions.css';

const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url}) => {
    const gifUrl = useFetch({keyword})

    return (
        <div className="bg-[#91018] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl transactioncard">

            <div className="flex flex-col items-center w-full mt-3">
                <div className="display-flex justify-start w-full mb-6 p-2">
                    <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Amount: {amount} ETH</p>
                    {message && (
                        <>
                        <br />
                        <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}
                    </div>
                    <p className="text-white text-base">{timestamp}</p>
                </div>

        </div>
    )
}

const Transactions = () =>{
    const {currentAccount, transactions, isLoading} = useContext(TransactionContext);
    return (
        <div>

        {currentAccount && <div className="flex w-full justify-center items-center 2x1:px-20 gradient-bg-transactions-connected">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Previous Transactions
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to see the latest transactions
                    </h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {[...transactions].reverse().map((transaction, i)=>(
                        <TransactionCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>}


        </div>

    );
}

export default Transactions;
