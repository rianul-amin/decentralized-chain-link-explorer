import { ITransaction } from '@/app/api/Blockchain';
import { GetTransactions } from '@/app/api/Transaction';
import Link from 'next/link';
import React from 'react';

async function LatestTransactions() {

  let latestTransactions: ITransaction[] = await GetTransactions()
  if(latestTransactions.length > 10) latestTransactions = latestTransactions.slice(0, 10)
  //const latestTransactions: ITransaction[] = []
  console.log(latestTransactions)

  const calculateElapsedTime = (timestamp: string | number | Date) => {
    const transactionTime = new Date(timestamp).getTime();
    const currentTime = Date.now();
    const elapsedTime = currentTime - transactionTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th colSpan="3" className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Latest Transactions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {latestTransactions.map((transaction, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900"><Link href={`/transactions/${transaction.transactionHash}`}><span className='text-blue-500'>{transaction.transactionHash.substring(0,4) + "..."}</span></Link></div>
                <div className="text-xs text-gray-500">{calculateElapsedTime(transaction.timestamp)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">From <Link href={"/addresses/"+transaction.from}><span className = "text-blue-500">{transaction.from.substring(0,4) + "..."}</span></Link> to <Link href={"/addresses/"+transaction.to}><span className = "text-blue-500">{transaction.to.substring(0,4) + "..."}</span></Link></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{transaction.value} DCL</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 py-4">
        <Link href="/transactions">
            <span className="text-gray-600 text-sm font-semibold">VIEW ALL TRANSACTIONS &nbsp;&nbsp; →</span>
        </Link>
      </div>
    </div>
  );
}

export default LatestTransactions;
