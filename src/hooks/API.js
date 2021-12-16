import axios from "axios"

// GET

export async function GetPost (postId) {
    try {
        const result = await axios.get(`https://localhost/4000/posts/${postId}`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function GetAnswers (postId) {
    try {
        const result = await axios.get(`https://localhost/4000/posts/${postId}/answers`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function GetReaction(postId) {
    try {
        const result = await axios.get(`https://localhost/4000/posts/${postId}/reactions`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function GetAllCategories() {
    try {
        const result = await axios.get(`https://localhost/4000/categories`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function GetAllThreads() {
    try {
        const result = await axios.get(`https://localhost/4000/threads`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function GetThread(threadId) {
    try {
        const result = await axios.get(`https://localhost/4000/threads/${threadId}`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

// POST

export async function CreatAnswer(postId,answer) {
    try {
        const result = await axios.post(`https://localhost/4000/posts/${postId}/answers`,answer)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function CreatThread(thread) {
    try {
        const result = await axios.post(`https://localhost/4000/threads`,thread)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

// PATCH

export async function UpdatePost(postId,info) {
    try {
        const result = await axios.patch(`https://localhost/4000/posts/${postId}`,info)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function EditThread(threadId,info) {
    try {
        const result = await axios.patch(`https://localhost/4000/threads/${threadId}`,info)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

// PUT 

export async function SetReaction(postId,value) {
    try {
        const result = await axios.patch(`https://localhost/4000/posts/${postId}/reactions`,value)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

// DELETE

export async function DeletePost(postId) {
    try {
        const result = await axios.delete(`https://localhost/4000/posts/${postId}`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function DeleteThread(threadId) {
    try {
        const result = await axios.delete(`https://localhost/4000/threads/${threadId}`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

export async function DeleteReaction(postId) {
    try {
        const result = await axios.delete(`https://localhost/4000/posts/${postId}/reactions`)
        console.log(result.data);
        return result.data
      } catch (error) {
        console.error(error);
      }
}

