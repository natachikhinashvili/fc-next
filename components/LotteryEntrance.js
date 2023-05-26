"use client"
import {useWeb3Contract,useMoralis} from "react-moralis"
import {abi, contractAddresses} from "../constants"
import {useEffect, useState} from 'react'
import {ethers} from "ethers"

export default function LotteryEntrance(){
    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainIdHex in contractAddresses ? contractAddresses[chainId][0] : null
    const [entraceFee, setEntranceFee] = useState("0")    
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")


    const {runContractFunction: enterRaffle} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entraceFee
    })
    const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {}
    })
    const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {}
    })
    const {runContractFunction: getRecentWinner} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {}
    })

    async function updateUI(){
        let l = await getEntranceFee()
        console.log(l)
        const entraceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entraceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if(isWeb3Enabled){
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx){
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function(){
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell"
        })
    }

    return(
        <div>
            Hi from lottery entrance! 
            {raffleAddress ? <div>
                <button onClick={async function(){await enterRaffle({
                    onSuccess: handleSuccess
                })}}> Enter raffle</button>
                Entrance Fee: {ethers.utils.formatUnits(entraceFee, "ether")} ETH
                Number Of Players: {numPlayers}
                Recent Winner: {recentWinner}
                </div> : (
                <div>No raffle address detected</div>
            )}
        </div>
    )
}