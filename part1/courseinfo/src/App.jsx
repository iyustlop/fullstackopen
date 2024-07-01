const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <p>{props.course.part} {props.course.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part course={props.parts[0]} />
      <Part course={props.parts[1]} />
      <Part course={props.parts[2]} />
    </div>

  )
}

const Total = (props) => {
  console.log(props)
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
    
  )
}

const App = () => {
  const course = 'Half stack application development'
  
  const parts = [
    {part: 'Fundamentals of React', exercises: 10},
    {part: 'Using props to pass data', exercises: 7},
    {part: 'State of a component', exercises: 14} 
  ]

  return (
  <div>
    <Header course={course} />
    <Content parts={parts}/>
    <Total parts={parts}/>
  </div>
  )
}

export default App
