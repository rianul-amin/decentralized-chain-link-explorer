// components/PostDetail.js
import React from 'react';
import Comment from './Comment';
import { Post } from './Post';





function PostDetail({id,title,content,votes,comments}:Post) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
            <div>
                <button>Upvote</button>
                <span>{votes}</span>
                <button>Downvote</button>
            </div>
            <h2 className="text-lg font-semibold mt-8 mb-4">Comments</h2>
            <div className="bg-white shadow-md p-4 rounded-lg">
            {comments.map((comment) => (
                <Comment key={comment.id} text={comment.text} id={comment.id} />
            ))}
            </div>
        </div>
    );
}

export default PostDetail;

