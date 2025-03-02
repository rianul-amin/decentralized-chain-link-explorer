import React from 'react'
import { ITransaction } from './Blockchain'
import axios from 'axios'

async function GetAddressDetails(key: string) {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT_CHAIN + "/blockchain/details/"+key)
    const transactions: ITransaction[] = res.data
    return transactions
}

export default GetAddressDetails


export async function GetAddressBalance(key: string) : Promise<number> {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT_CHAIN + "/transaction/balance/"+key)
    const bal : number = res.data
    return bal
}