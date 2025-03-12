const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
    
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
  
}

const Total = (props) => <p>Number of exercises {props.total}</p>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'TEST : State of a component',
        exercises: 10,
        id: 0
      },
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'TEST : State of a component',
        exercises: 10,
        id: 5
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'TEST : State of a component',
        exercises: 10,
        id: 6
      }
    ]
  }

  return <Course course={course} />
}

export default App