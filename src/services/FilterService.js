import { api } from './Api'
const SEARCH_POST_API_URL = "/api/posts/filter"

export const filterPosts = async (inputModel) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(inputModel)
  }
  return api(SEARCH_POST_API_URL, options)
}