import Total from "./Total"

const Content = ({ courses }) => {
  console.log('content', courses)
  return (
    <>
      {courses.map((course,index) => (
        <div key={index}>
          <h2 key={course.id}>{course.name}</h2>
          {course.parts.map((part)=> {
            return (<p key={part.id}>{part.name} {part.exercises}</p>)
          })}
          <Total parts={course.parts}/>
        </div>
        ))}
    </>
  )
}

export default Content