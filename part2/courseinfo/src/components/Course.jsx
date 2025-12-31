const Header = ({course}) => <h2>{course.name}</h2>

const Content = ({ parts }) => {
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

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
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
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course