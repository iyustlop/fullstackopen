const CreateBlogForm = (props) => {
    return (
      <div>
        <h2>Create new</h2>
        <div>title <input onChange={props.handleChange}/></div>
        <div>author <input onChange={props.handleChange}/></div>
        <div>url <input onChange={props.handleChange}/></div>
        <button onClick={props.handleCreateNewBlog}>create</button>
      </div>
    )
  }

  export default CreateBlogForm