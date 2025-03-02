import axios from "axios";


export interface ITransaction {
    status: string;
    block: number;
    timestamp: number;
    transactionAction: string;
    from: string;
    to: string;
    value: number;
    transactionFee: number;
    gasPrice: number;
    transactionHash: string;
    signature: string;
}



export async function GetTransactions(): Promise<ITransaction[]> {
    const res = await axios.patch(process.env.NEXT_PUBLIC_API_ENDPOINT_CHAIN + "/blockchain/transactions")
    const transactions: ITransaction[] = res.data
    return transactions
}
export async function GetTransaction(hash: string): Promise<ITransaction> {
    const res = await axios.patch(process.env.NEXT_PUBLIC_API_ENDPOINT_CHAIN + "/blockchain/transactions/"+hash)
    const transaction : ITransaction = res.data
    return transaction
}
