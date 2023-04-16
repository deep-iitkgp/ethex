
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from ".";
import React, {useContext} from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
import kgplogo from "./kgplogo.png"
import './Welcome.css';
import Typewriter from "typewriter-effect";

import { useState, useEffect } from "react";
import headerImg from "./kgplogo.png"


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () =>{
    const {connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading}  = useContext(TransactionContext);
    //console.log(value);
    let x="Connected Ethereum Account:";
    const handleSubmit = (e) => {
        const {addressTo, amount, keyword, message} = formData;
        e.preventDefault();
        if(!addressTo || !amount || !keyword || !message){
            return;
        }
        sendTransaction();
      };



      const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
    return (
        <div className="big_container">
       {/*
       <div>

           {!currentAccount && <div className="flex w-full justify-center items-center gradient-bg-welcome-disconnected">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                <img src="https://zishansami102.github.io/images/open2.png " alt="React Image" className="kgplogo"/>
                <div className="Con">
                <div className="Auto">
                <Typewriter
                    options={{
                    strings: ["Welcome to eSwap !!", "You are disconnected :("],
                    autoStart: true,
                        loop: true,
        }}
      />
      </div>
    </div>
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                </p>
                { !currentAccount && <button
                    type="button"
                    onClick={connectWallet}
                    className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    <AiFillPlayCircle className="text-white mr-2" />
                    <p className="text-white text-base font-semibold">
                        Connect Wallet
                    </p>
                </button>}
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <p className="text-white font-semibold text-lg mt-1">
                                {currentAccount && x}
                    </p>
                    <p className="text-white font-sem,ibold text-sm">
                                {currentAccount}
                    </p>
                    {<div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {isLoading
                            ? <Loader />
                            : (
                            <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                                Send now
                            </button>
                        )}
                    </div>}
                </div>
            </div>
        </div>}

        {currentAccount &&
            <div className="flex w-full justify-center items-center gradient-bg-welcome-connected">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                <img src="https://zishansami102.github.io/images/open2.png " alt="React Image" className="kgplogo"/>
                <div className="Con">
                <div className="Auto">
                <Typewriter
                    options={{
                    strings: ["Connected :)", ""],
                    autoStart: true,
                        loop: true,
        }}
      />
      </div>
    </div>
                <p><b>Account No.</b> {currentAccount}</p>
                <p><b>Username.</b></p>
                <p>deep_iitkgp</p>
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                </p>
                { !currentAccount && <button
                    type="button"
                    onClick={connectWallet}
                    className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    <AiFillPlayCircle className="text-white mr-2" />
                    <p className="text-white text-base font-semibold">
                        Connect Wallet
                    </p>
                </button>}
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <p className="text-white font-semibold text-lg mt-1">
                                {currentAccount && x}
                    </p>
                    <p className="text-white font-sem,ibold text-sm">
                                {currentAccount}
                    </p>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {isLoading
                            ? <Loader />
                            : (
                            <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                                Send now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        }


</div>
    */}
    <div className="elements" id="element2">
    <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Welcome to eSwap !!
            {!currentAccount && <Typewriter
                    options={{
                    strings: ["You are disconnected :("],
                    autoStart: true,
                        loop: true,
        }}
      />}
      </h1>
          <p className="description">
            WebApp used to do transactions in ETH globally.
          </p>
          </div>
    </div>

    <div className="elements" id="element3">
    <div className="flex w-full justify-center items-center" id="element3">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4" id="element3">
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} className="field"/>
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} className="field"/>
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} className="field"/>
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} className="field"/>
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
            {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          {currentAccount && <><p className="description">
            Connected Account : { shortenAddress(currentAccount)}
          </p>
          </>}
          </div>
        </div>
      </div>
              </div>
    </div>

        </div>
    );
}

export default Welcome;
