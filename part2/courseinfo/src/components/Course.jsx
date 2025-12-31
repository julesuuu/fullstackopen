const Header = ({course}) => <h1>{course.name}</h1>

const Content = ({ course }) => {
  const {parts} = course
  console.log('parts', parts)
  
  return (
    <div>
      {parts.map(part =>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
    </div>
  )
}

const Course = ({ course }) => {
  console.log('course', course)
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

export default Course