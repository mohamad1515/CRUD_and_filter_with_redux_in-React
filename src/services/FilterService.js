import { api } from './Api'
const SEARCH_POST_API_URL = "/api/posts/filter"
const CREATE_POST_API_URL = "/api/products/"
const UPDATE_POST_API_URL = "/api/products/"
const DELETE_POST_API_URL = "/api/products/"

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

export const createPost = async (inputModel) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "put",
    body: JSON.stringify(inputModel)
  }
  return api(CREATE_POST_API_URL, options)
}

export const updatePost = async (inputModel, param) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "put",
    body: JSON.stringify(inputModel)
  }
  return api(`${UPDATE_POST_API_URL + param}`, options)
}

export const deletePost = async (inputModel, param) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "put",
    body: JSON.stringify(inputModel)
  }
  return api(`${DELETE_POST_API_URL + param}`, options)
}