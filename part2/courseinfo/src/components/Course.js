const Header = ({ title }) => <h2>{title}</h2>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
      <strong>total of {total} exercises</strong>
    </div>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        // [<Header key={course.id} title={course.name}/>,
        // <Content key={course.id} parts={course.parts}/>]
        return (
          <>
            <Header key={course.id} title={course.name} />
            <Content key={course.parts.id} parts={course.parts} />
          </>
        )
      }
      )}
    </div>
  )
}

export default Course