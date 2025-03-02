// components/Comment.js
import React from 'react';
 interface Comment {
    id: number;
    text: string;
}

function Comment({ text }:Comment) {
    return (
        <div className="bg-gray-100 p-2 rounded-md mb-2">
        <p>{text}</p>
    </div>
    );
}

export default Comment;

