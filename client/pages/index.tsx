import { useState, useEffect } from 'react';
import { ArtManagementContractAddress } from '../config.js';
import {ethers} from 'ethers';
import {Binance} from 'binance-api-node';
import axios from 'axios';
import { NextPage } from "next";



import ArtManagement from '../utils/AddArtWork.sol/ArtManagement.json'

import Art from './components/Art';
import Network from './'

const Home: NextPage = () => {

  useEffect(()=>{
    const { ethereum }:any = window

    console.log(ethereum,"etherium")
  }, [])
  

  	const [currentAccount, setCurrentAccount] = useState('')
    const [correctNetwork, setCorrectNetwork] = useState(false)

    const [txError, setTxError] = useState(null)

    const [arts, setArts] = useState([]);
    const [artName, setArtName] = useState('');
    const [artBeard, setArtBeard] = useState('');
    const [artAge, setArtAge] = useState('');
    const [artFinished, setArtFinished] = useState('');

  // Calls Metamask to connect wallet on clicking Connect Wallet button
	const connectWallet = async () => {
		try {
			const { ethereum } : any = window;
      const dev= '000p'
    //  const client = Binance.default();

			if (!ethereum) {
				console.log('Metamask not detected')
				return
			}
			let chainId = await ethereum.request({ method: 'eth_chainId'})
			console.log('Connected to chain:' + chainId)

			const rinkebyChainId = '0X61'

			if (chainId == rinkebyChainId) {
				alert('You are not connected to the Binance Testnet!')
				return
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

			console.log('Found account', accounts[0])
			setCurrentAccount(accounts[0])
		} catch (error) {
			console.log('Error connecting to metamask', error)
		}
	}



  // Checks if wallet is connected to the correct network
const checkCorrectNetwork = async () => {
  const { ethereum } : any = window
  let chainId = await ethereum.request({ method: 'eth_chainId' })
  console.log('Connected to chain:' + chainId)

  const rinkebyChainId = '0x61'

  if (chainId !== rinkebyChainId) {
    setCorrectNetwork(false)
  } else {
    setCorrectNetwork(true)
  }
}

const getArts = async() => {
    try {
      const { ethereum } : any = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const ArtManagementContract = new ethers.Contract(
          ArtManagementContractAddress,
          ArtManagement.abi,
          signer
        )

        let artsFinished = await ArtManagementContract.getFinishedArts()

        let artsUnFinished = await ArtManagementContract.getUnfinishedArts()


        console.log(artsUnFinished);
        console.log("Arts:- ")
        console.log(artsFinished);

        let arts = artsFinished.concat(artsUnFinished)
        setArts(arts);

      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
     // setTxError(error.message)
    }
  }

  const clickArtFinished = async (id : any) => {
    console.log(id);

    try {
      const { ethereum } : any = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const ArtManagementContract = new ethers.Contract(
          ArtManagementContractAddress,
          ArtManagement.abi,
          signer
        )

        let artManagementTx = await ArtManagementContract.setFinished(id, true);

        console.log(artManagementTx);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log('Error Submitting new Art', error)
     // setTxError(error.message)
    }
  }

const submitArt = async () => {
  let art = {
      'name': artName,
      'age': parseInt(artAge),
      'bread': artBeard,
      'finished': artFinished == "yes" ? true : false
  };

  try {
    const { ethereum } : any = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const ArtManagementContract = new ethers.Contract(
        ArtManagementContractAddress,
        ArtManagement.abi,
        signer
      )

      let artManagementTx = await ArtManagementContract.addArt(art.name, art.age, art.bread, art.finished);

      console.log(artManagementTx);
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log('Error Submitting new Art', error)
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
      errorMessage = error.message;
      // setTxError(error.message);
    }
    console.log(errorMessage);
    
  }
};

  return (
    <div className='flex flex-col items-center bg-[#f3f6f4] text-[#6a50aa] min-h-screen'>
  <div className='trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out'>
  </div>
  <h2 className='text-3xl font-bold mb-20 mt-12'>
    Manage your ArtManagement Catalog
  </h2>
  {currentAccount === '' ? (
    <button
    className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
    onClick={connectWallet}
    >
    Connect Wallet
    </button>
    ) : correctNetwork ? (
      <h4 className='text-3xl font-bold mb-20 mt-12'>
        Wallet Connected
      </h4>
    ) : (
    <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
    <div>----------------------------------------</div>
    <div></div>
    <div>Add your Art work</div>
    <div>----------------------------------------</div>
    </div>
  )}
  <div className='text-xl font-semibold mb-20 mt-4'>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Art Name" value={artName} onChange={(e) => setArtName(e.target.value)} />
      <br/>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Art Bread" value={artBeard} onChange={(e) => setArtBeard(e.target.value)} />
      <br/>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Art age" value={artAge} onChange={(e) => setArtAge(e.target.value)} />
      <br/>
      <label>
        Have you Finished creating this art?
        <select value={artFinished} onChange={(e) => setArtFinished(e.target.value)}>
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
      </label>
      <button className='text-xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={submitArt} >
        Add Art
      </button>
  </div>
  {(
    <div className='flex flex-col justify-center items-center'>
      <div className='font-semibold text-lg text-center mb-4'>
        Arts List
      </div>
      <button className='text-xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={getArts} >
        Get Arts
      </button>
      {arts.map((art : any) => (
        <Art
          key={art.id}
          id={parseInt(art.id)}
          name={art.name}
          age={parseInt(art.age).toString()}
          bread={art.bread}
          finished={art.finished.toString()}
          clickArtFinished={clickArtFinished}
        />
      ))}
    </div>
  )}
</div>
  )
}

export default Home