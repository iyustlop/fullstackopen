import { useState } from "react"
import blogs from "../services/blogs"
import Toggable from "./Toggable"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          <div>{blog.likes}<button>like</button></div>
          <div>{blog.user.name}</div>
          </div>)}
    </div>
  </div>  
)
}
export default Blog