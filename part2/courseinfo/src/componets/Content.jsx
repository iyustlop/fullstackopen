import Part from "./Part"

const Content = ({ course }) => {
  console.log('content', course.parts)
    return (
        <Part parts={course.parts} />
    )
  }

  export default Content