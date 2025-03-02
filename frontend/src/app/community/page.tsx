'use client'

import React, { useState } from 'react';
import ChatRoom from '@/components/ChatRoom';
import Navbar from '@/components/Navbar';
import CommunityPage from '@/components/CommunityPage';
import getAllPosts from './api/Post';



function Community() {
  const [showChat, setShowChat] = useState(false);
  const toggleChatVisibility = () => {
    setShowChat(!showChat);
  };
  
  return (
    <>
      <Navbar />
      <div style={{ margin: '40px' }}>
      <div className="flex justify-center mt-8">
        <button
          onClick={toggleChatVisibility}
          className="border border-black bg-white py-2 px-40 rounded"
        >
          {showChat ? 'Hide Chat' : 'Load Chat'}
        </button>
      </div>
      {showChat && <ChatRoom />}
      </div>
      <div>
      <CommunityPage />
      </div>
    </>
  );
}

export default Community;