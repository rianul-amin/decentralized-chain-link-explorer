import axios from "axios";

async function getAllVotesByPostID(postid: number){
    const vote = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+`/votes/post/${postid}/count`)
    return vote.data.vote
}

export async function addVote(postID: number, value: number){

    try{
        const vote = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+`/votes`, {
            postID,
            value
        })
        return true
    }
    catch(e){
        return false;
    }
    
}

export default getAllVotesByPostID