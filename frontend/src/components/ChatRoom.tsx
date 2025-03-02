'use client'

import React, { useState } from 'react';

function ChatRoom() {
    const [messages, setMessages] = useState([
        { sender: "Alice", text: "Hello!" },
        { sender: "Bob", text: "Hey, how's it going?" },
        { sender: "Alice", text: "I'm good, thanks!" },
        { sender: "Bob", text: "What are you up to?" },
        { sender: "Alice", text: "Just working on some projects. You?" },
        { sender: "Bob", text: "Same here. Have a great day!" },
        { sender: "Alice", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleMessageSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            setMessages([...messages, { sender: "You", text: newMessage }]);
            setNewMessage('');
        }
    };

    return (
        <div className="mx-auto rounded-lg shadow-md p-4 mb-4 max-w-auto overflow-x-hidden" style={{ margin: '20px' }}>
            <div className="h-64 overflow-y-auto mb-4" style={{ padding: '20px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {messages.map((message, index) => (
                    <div key={index} className="mb-2">
                        <span className="font-semibold">{message.sender}: </span>{message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleMessageSubmit} className="flex items-center">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow px-2 py-1 rounded-l focus:outline-none"
                />
                <button type="submit" className="px-5 py-1 bg-zinc-950 text-white rounded-r focus:outline-none">
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatRoom;
