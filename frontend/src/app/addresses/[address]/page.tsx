import GetAddressDetails, { GetAddressBalance } from '@/app/api/Address';
import { ITransaction } from '@/app/api/Blockchain';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import Link from 'next/link';
import React from 'react'

async function Address({ params }: { params: { address: string } }) {
  const transactions: ITransaction[] = await GetAddressDetails(params.address)
  const first_ : ITransaction = transactions[0]
  const last_ : ITransaction = transactions[transactions.length-1]
  const isTransAvailable = transactions.length > 0
  const bal : any = await GetAddressBalance(params.address)
  
  return (
    
    <>
      <Navbar/>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg" style={{margin: 40}}>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Address Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-4">{params.address}</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">DCL Balance</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{bal.balance}</dd>
              </div>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">First Transaction Sent</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"><Link href={`/transactions/${isTransAvailable && first_.transactionHash}`}><span className='text-blue-500'>{isTransAvailable && first_.transactionHash.substring(0,16) + "..."}</span></Link></dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last Transaction Sent</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"><Link href={`/transactions/${isTransAvailable && last_.transactionHash}`}><span className='text-blue-500'>{isTransAvailable && last_.transactionHash.substring(0,16) + "..."}</span></Link></dd>
              </div>
            </dl>
          </div>
          <div className="w-full">
          <table className="w-full divide-y divide-gray-200" style={{ marginTop: '60px' }}>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Transaction Hash</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Block</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">From</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">To</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><Link href={`/transactions/${transaction.transactionHash}`}><span className='text-blue-500'>{transaction.transactionHash.substring(0,4) + "..."}</span></Link></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{"Transfer"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><Link href={`/blocks/${transaction.block}`}><span className='text-blue-500'>{transaction.block}</span></Link></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><Link href={`/addresses/${transaction.from}`}><span className='text-blue-500'>{transaction.from.substring(0,4) + "..."}</span></Link></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><Link href={`/addresses/${transaction.to}`}><span className='text-blue-500'>{transaction.to.substring(0,4) + "..."}</span></Link></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.value} DCL</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        <br /><br /><br /><br />
        <Footer/>
    </>
    
  )
}

export default Address