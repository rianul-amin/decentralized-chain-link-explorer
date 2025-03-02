import { IComment } from './../../../components/CommunityPage';
import axios from "axios"

async function getAllCommentByPostID(postid: number){
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+`/comments/post/${postid}`)
    const comments:IComment[] = res.data
    return comments
}

export async function PostComment(content:string, postID: number) {
    try{
        await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+"/comments", {
            content,
            postID,
            userID: 1
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return true
    }
    catch(e) {
        return false
    }
}

export default getAllCommentByPostID