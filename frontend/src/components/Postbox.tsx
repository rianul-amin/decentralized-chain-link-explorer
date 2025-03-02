
import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { IComment } from './CommunityPage';
import { PostComment } from '@/app/community/api/Comment';



function PostBox({comments, postID, rf}:any) {
    const [newComment, setNewComment] = useState('');
    const [err, setErr] = useState('')
    const [allComments, setAllComments] = useState<IComment[]>(comments);
    


    const handleCommentSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(newComment.length < 5) {
            setErr('Comment is too short')
            return
        }

        try{
            const status = await PostComment(newComment, postID)
            if(status) {
                setErr('Posted')
                setNewComment('')
            } else {
                setErr('Failed to post ' + postID)
            }
        }
        catch {
            setErr('Unknown Error when comment')
        }
    };

    return (
        <>
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            
            <div>
                {allComments.map(comment => (
                    <Comment key={comment.id} text={comment.content} id={comment.id} />
                ))}
            </div>
            {err}
            <form onSubmit={handleCommentSubmit} className="mt-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a new comment..."
                    className="px-3 py-1 w-full border rounded"
                />
                <button type="submit" className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Add Comment</button>
            </form>
        </>
    );
}

export default PostBox;
