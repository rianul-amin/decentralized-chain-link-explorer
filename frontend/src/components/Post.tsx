'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Comment from './Comment';
import PostBox from './Postbox';
import { IComment, IPost } from './CommunityPage';
import getAllVotesByPostID, { addVote } from '@/app/community/api/Vote';
import getAllCommentByPostID from '@/app/community/api/Comment';
import getAllPosts from '@/app/community/api/Post';

function Post({ id, title, content, vote, comments }: IPost) {
    const [showPostBox, setShowPostBox] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [_vote, setVote] = useState(vote);

    useEffect(() => {
        const updateVoteCount = async () => {
            setVote(await getAllVotesByPostID(id))
        }
        updateVoteCount();
    }, [refresh])

    // const togglePostVisibility = () => {
    //     setShowPostBox(!showPostBox);
    // };

    const handlePostClick = () => {
        setShowPostBox(true);
    };

    const upvote = async () => {
        await addVote(id, 1)
        setRefresh(!refresh)
    }

    const downvote = async () => {
        await addVote(id, -1)
        setRefresh(!refresh)
    }

    return (
        <div className="bg-white shadow-md p-4 rounded-lg" onClick={handlePostClick}>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{content}</p>
            <div className="flex items-center mb-4">
                <button className="mr-2" onClick={upvote}>Upvote</button>
                <span>{_vote}</span>
                <button className="ml-2" onClick={downvote}>Downvote</button>
            </div>
            {showPostBox && <PostBox key={id} comments={comments} postID={id} rf={refresh}/>}

        </div>
    );
}

export default Post;
