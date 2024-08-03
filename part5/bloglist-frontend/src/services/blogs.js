import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveOneBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  
  return response.data
}

export default { getAll, saveOneBlog, setToken, getToken }