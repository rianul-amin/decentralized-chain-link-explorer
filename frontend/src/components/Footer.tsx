import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-800 py-8 px-6 flex flex-col lg:flex-row justify-between items-center text-white relative bottom-0 w-full">
      <div className="flex flex-col ml-8 mb-10 lg:mb-10 mt-10 lg:mt-10">
        <h1 className="text-2xl font-bold mb-4">DCLscan</h1><br />
        <p className="text-lg leading-loose">DCLscan is a robust and user-friendly blockchain simulation <br />platform that replicates key features of a real-world blockchain <br />network. This includes decentralized transaction processing, smart <br />contracts, gas fees, and wallet management.</p>
      </div>
      <div className="flex flex-col lg:flex-col lg:space-y-4 mr-10 lg:text-right">
        <Link href="/contact">
          <p className="text-xl mr-8">Company</p>
        </Link>
        <Link href="/about">
          <p className="text-sm mr-8">About Us</p>
        </Link>
        <Link href="/contact">
          <p className="text-sm mr-8">Brand Assets</p>
        </Link>
        <Link href="/about">
          <p className="text-sm mr-8">Contact Us</p>
        </Link>
        <Link href="/contact">
          <p className="text-sm mr-8">Terms & Conditions</p>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
