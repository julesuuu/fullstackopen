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

const Total = ({ course }) => {
  const { parts } = course
  console.log('parts' ,parts)
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises
  return (
    <strong>
      total of {total} exercises
    </strong>
  )
}

const Course = ({ course }) => {
  console.log('course', course)
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course