'use client'
import React, { useEffect, useState } from 'react';
import Post from './Post';
import CreatePostPage from './CreatePost';
import getAllPosts from '@/app/community/api/Post';
import getAllCommentByPostID from '@/app/community/api/Comment';
import getAllVotesByPostID from '@/app/community/api/Vote';

export interface IPost {
    id: number;
    title: string;
    content: string;
    postedOn: Date;
    isEdited: boolean;
    vote: number;
    comments: IComment[]
}

export interface IComment {
    id: number;
    content: string;
    timestamp: Date;
    isEdited: boolean;
}



function CommunityPage() {
    const [createPost, setShowCreate] = useState(false);

    const toggleChatVisibility = () => {
        setShowCreate(!createPost);
    };

    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        const getPost = async () => {
            const posts_:IPost[] = await getAllPosts()
            
            for(let post of posts_) {
                //console.log(await getAllVotesByPostID(post.id))
                post.vote = await getAllVotesByPostID(post.id)
                post.comments = await getAllCommentByPostID(post.id)
            }
            setPosts(posts_)
            console.log(posts)
        }
        getPost();
    })

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Community</h1>
            <div className="flex justify-center mt-8">
                <button
                    onClick={toggleChatVisibility}
                    className="border border-black bg-white py-2 px-40 rounded"
                >
                    {createPost ? 'Hide Create Post' : 'Create Post'}
                </button>
            </div>
            {createPost && <CreatePostPage />}
            <div className="grid grid-cols-1 gap-4">
                {posts.map(post => (
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        vote={post.vote}
                        comments={post.comments}
                        postedOn={post.postedOn}
                        isEdited={post.isEdited}
                    />
                ))}
            </div>
        </div>
    );
}

export default CommunityPage

