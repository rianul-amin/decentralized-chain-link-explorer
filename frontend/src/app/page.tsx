import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import LatestBlocks from '@/components/LatestBlocks';
import LatestTransactions from '@/components/LatestTransactions';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { ITransaction, IBlock, GetBlockchain } from './api/Blockchain';
import { GetTransactions } from './api/Transaction';

const Home = async () => {
  const latestTransactions: ITransaction[] = await GetTransactions()
  
  const latestBlocks: IBlock[] = await GetBlockchain()
  const latest: IBlock = latestBlocks[latestBlocks.length-1]
  return (
    <>
      <Navbar />
<div className="relative">
  <img src={'/home-panel.jpg'} alt="Panel" className="w-full h-auto opacity-50 mb-8" />
  <div className="absolute top-0 right-0 mt-8 mr-8">
    <div className="bg-transparent px-4 py-2 rounded-lg border border-black w-96">
      <input
        type="text"
        placeholder="Search by Address / Txn Hash / Block"
        className="w-full h-full px-2 bg-transparent placeholder-gray-500 focus:outline-none"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      />
    </div>
  </div>
  <table className="absolute top-8 left-10">
    <tbody>
      <tr>
        <td>
          <div className="text-lg font-semibold text-gray-500">Transactions</div>
          <div className="text-6xl font-bold text-zinc-500">{latestTransactions.length}</div><br /><br />
        </td>
      </tr>
      <tr>
        <td>
          <div className="text-lg font-semibold text-gray-500">Blocks</div>
          <div className="text-6xl font-bold text-zinc-500">{latestBlocks.length}</div><br /><br />
        </td>
      </tr>
      <tr>
        <td>
          <div className="text-lg font-semibold text-gray-500">Last Finalized Block</div>
          <div className="text-6xl font-bold text-zinc-500"><Link href={`/blocks/${latest.blockInfo.blockHash}`}><span className='text-blue-500'>{latest.blockInfo.blockHash.substring(0,8) + "..."}</span></Link></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<br /><br /><br />
<div className="container mx-auto px-4 flex justify-center items-center h-screen">
  <div className="p-4 w-full">
    <div className="flex justify-between">
      <div className="w-5/12 pr-4">
        <LatestBlocks />
      </div>
      <div className="w-5/12 pl-4">
        <LatestTransactions />
      </div>
      
    </div>
  </div>
</div>
<br /><br /><br /><br />
<Footer/>
    </>
  );
};

export default Home;

