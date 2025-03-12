const Header = (props) => <h2>{props.course}</h2>

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
        <Total parts={course.parts}/>
      </>
    )
    
  }
  
  const Total = ({parts}) => {
    const exercise_arr = parts.map(part => part.exercises)
    const total = exercise_arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    )
    
    return  (
      <>
        <p><b>total of {total} exercises</b></p>
      </>
    )
  
  } 

  export default Course