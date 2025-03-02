// CreatePostPage.js
import { addNewPost } from '@/app/community/api/Post';
import React, { useState } from 'react';

function CreatePostPage() {
    const [err, setErr] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handlePostSubmit =  async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(title.length < 4) {
            setErr("Title is too short")
            return
        }
        if(content.length < 8){
            setErr("Content of the post is too short")
            return
        }

        try{
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            const status = await addNewPost(formData)
            if(status) {
                setErr('Posted')
                setTitle('')
                setContent('')
            }
            else setErr('Failed to post')
        }
        catch(e) {
            setErr("Unknown Error Occured")
        }


        
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
            {err} 
            <form onSubmit={handlePostSubmit}>
                <input type="text" className="w-full h-16 px-4 py-2 border rounded-lg mb-4" placeholder="Write your title here..." value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-32 px-4 py-2 border rounded-lg mb-4"
                    placeholder="Write your post here..."
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Create Post
                </button>
            </form>
            <br />
        </div>
    );
}

export default CreatePostPage;
