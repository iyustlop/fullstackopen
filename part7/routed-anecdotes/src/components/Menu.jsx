import { Link, Route, Routes } from "react-router-dom"
import AnecdoteList from "./AnecdoteList"
import About from "./About"

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <>
        <div>
          <Link to={'/'} style={padding}>anecdotes</Link>
          <Link to={'/create'} style={padding}>create new</Link>
          <Link to={'/about'} style={padding}>about</Link>
        </div>
      </>
    )
  }

export default Menu