import { IPost } from "@/components/CommunityPage"
import axios from "axios"

async function getAllPosts(): Promise<IPost[]> {
  const result = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+"/posts")
  const data = result.data
  return data
}

export async function addNewPost(formData: FormData) {
  try{
    await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+"/posts", formData, {
      headers: {
          'Content-Type': 'application/json'
      }
  })
    return true
  }
  catch(e){
    console.log(e)
    return false
  }
}

export default getAllPosts