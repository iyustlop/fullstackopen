import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
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

const updateABlog = async (blog) => {
  const response = await axios
    .put(`${baseUrl}/${blog.id}`,blog)

  return response.data
}

const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios
    .delete(`${baseUrl}/${blog}`, config)

  return response.data
}

export default { getAll, saveOneBlog, updateABlog, removeBlog, setToken }