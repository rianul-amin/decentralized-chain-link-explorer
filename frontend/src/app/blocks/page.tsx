import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { GetBlockchain, IBlock } from '../api/Blockchain';

async function Blocks() {
  const blocksData: IBlock[] = await GetBlockchain()
  const latest: IBlock = blocksData[blocksData.length-1]
  const oldest: IBlock = blocksData[0]

  const convertToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      blocksData.map((block) => Object.values(block).join(",")).join("\n");
    return encodeURI(csvContent);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h2 className="font-semibold mb-8 mt-4">Blocks</h2>
        <h2 className="mb-10 font-semibold">Last Safe Block <Link href={`/blocks/${latest.blockInfo.blockHash}`}><span className='text-blue-500'>{latest.blockInfo.blockHash.substring(0,4) + "..."}</span></Link></h2> 
        <h2 className="text-sm mb-12">
            Total of {blocksData.length} blocks <br />
            (Showing blocks between <Link href={`/blocks/${oldest.blockInfo.blockHash}`}><span className='text-blue-500'>{oldest.blockInfo.blockHash}</span></Link> to <Link href={`/blocks/${latest.blockInfo.blockHash.substring(0,4) + "..."}`}><span className='text-blue-500'>{latest.blockInfo.blockHash}</span></Link>)
            <a
              href={convertToCSV()}
              download="blocks-data.csv"
              style={{float: 'right'}}
            >
              Download Page Data
            </a>
        </h2>
        <div className="w-full">
          <table className="w-full divide-y divide-gray-200" style={{ margin: '20px' }}>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Block</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Txn</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Validator</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blocksData.map((block, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><Link href={`/blocks/${block.blockInfo.blockHash}`}><span className='text-blue-500'>{block.blockInfo.blockHash.substring(0,4) + "..."}</span></Link></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{block.blockInfo.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{block.transactions.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><Link href={`/addresses/${block.blockInfo.validator.publicKey}`}><span className='text-blue-500'>{block.blockInfo.validator.publicKey.substring(0,4) + "..."}</span></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br /><br /><br /><br />
      <Footer/>
    </>
  );
}

export default Blocks;