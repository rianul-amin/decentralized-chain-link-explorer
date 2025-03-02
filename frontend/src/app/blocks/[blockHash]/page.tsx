import { GetBlockByHash, GetBlockchain, IBlock } from '@/app/api/Blockchain';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import Link from 'next/link';
import React from 'react'

async function Block({ params }: { params: { blockHash: string } }) {

  const blockData: IBlock =  await GetBlockByHash(params.blockHash)

  return (
    <>
      <Navbar />
        <div className="bg-white shadow overflow-hidden sm:rounded-lg" style={{margin: 40}}>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Block Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-4">{params.blockHash.substring(0,4) + "..."}</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Block Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{blockData.blockInfo.blockHash.substring(0,4) + "..."}</dd>
              </div>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">Finalized</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{blockData.blockInfo.timestamp}</dd>
              </div>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Transactions</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{blockData.transactions.length}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Validator</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"><Link href={`/addresses/${blockData.blockInfo.validator.publicKey}`}><span className='text-blue-500'>{blockData.blockInfo.validator.publicKey.substring(0,4) + "..."}</span></Link></dd>
              </div>
            </dl>
          </div>
        </div>
        <br /><br /><br /><br />
        <Footer/>
    </>
  )

}

export default Block