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

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  /* const total = parts.reduce((s, p) => {
    console.log('sum:', s, 'part:', p)
    return s + p.exercises}, 0)  */
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
      <Total parts={course.parts} />
    </div>
  )
}

export default Course