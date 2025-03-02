import axios from "axios";

export interface IValidator {
    publicKey: string;
    stakingBalance: string | null;
    validatorSignature: string | null;
}

export interface IProofOfStake {
    stakingReward: number;
}

export interface IBlockInfo {
    blockNumber: number;
    timestamp: number;
    merkleRoot: string;
    blockHash: string;
    previousBlockHash: string;
    validator: IValidator;
    proofOfStake: IProofOfStake;
}

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

export interface IBlock {
    blockInfo: IBlockInfo;
    transactions: ITransaction[];
}


export async function GetBlockchain(): Promise<IBlock[]> {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT_CHAIN + "/blockchain")
    const blocks: IBlock[] = res.data
    console.log(blocks)
    return blocks
}
export async function GetBlockByHash(hash: string): Promise<IBlock> {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT_CHAIN + "/blockchain/"+hash)
    const block : IBlock = res.data
    return block
}
