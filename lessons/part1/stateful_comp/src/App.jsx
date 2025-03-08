import { useState } from 'react'

// list state to closest common ancestor
const Display = ({counter}) => ( <div>{counter}</div>)


const Button = ({onClick, name}) => (
    <button onClick={onClick}>
      {name}
    </button>
)


const App = () => {

  const [ counter, setCounter ] = useState(0)
  console.log("rendering with counter value", counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <>
      <Display counter={counter}/>
      <Button name="plus" onClick={increaseByOne}/>
      <Button name="minus" onClick={decreaseByOne}/>
      <Button name="reset" onClick={setToZero}/>
    </>
   
  )
}

export default App