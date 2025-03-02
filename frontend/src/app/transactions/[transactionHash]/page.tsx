import { GetTransaction } from '@/app/api/Transaction';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React from 'react';

async function Transaction({params} : {params: {transactionHash: string}}) {
  const transactionData = await GetTransaction(params.transactionHash)
  console.log("Tran" + transactionData)
  return (
    <>
      <Navbar />
      <div className="bg-white shadow overflow-hidden sm:rounded-lg" style={{ margin: 40 }}>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Transaction Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-4">{transactionData.transactionHash}</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">Success</dd>
            </div>
            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Block</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"><Link href={`/blocks/${transactionData.block}`}><span className='text-blue-500'>{transactionData.block}</span></Link></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{transactionData.timestamp}</dd>
            </div>
            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">From</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"><Link href={`/addresses/${transactionData.from}`}><span className='text-blue-500'>{transactionData.from.substring(0,16) + "..."}</span></Link></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">To</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"><Link href={`/addresses/${transactionData.to}`}><span className='text-blue-500'>{transactionData.to.substring(0,16) + "..."}</span></Link></dd>
            </div>
            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Value</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{transactionData.value} DCL</dd>
            </div>
          </dl>
        </div>
      </div>
      <br /><br /><br /><br />
      <Footer/>
    </>
  );
}

export default Transaction;