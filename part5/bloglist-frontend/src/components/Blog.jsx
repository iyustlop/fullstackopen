import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemoveBlog  }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = async () => {
    const newBlog = { ...blog, likes: blog.likes+1 }

    handleLike(newBlog)
  }

  const handleRemoveBlogClick = async () => {
    handleRemoveBlog(blog)
  }

  return (
    <div>
      <div style={blogStyle}>{blog.title}
        {view ?
          <button onClick={() => {setView(false)}}>hide</button> :
          <button onClick={() => {setView(true)}}>view</button>
        }
        {view &&(<div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>{blog.likes}<button onClick={handleLikeClick}>like</button></div>
          <div>{blog.user.name}</div>
          <button onClick={handleRemoveBlogClick}>remove</button>
        </div>)}
      </div>
    </div>
  )
}
export default Blog