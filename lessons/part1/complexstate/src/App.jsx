import { useState } from 'react'


const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(" ")}
        </div>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

// never define components in other components
const App = () => {

    // DO NOT call useState inside loops, conditional expressions
    // only call hooks from inside function body defining component
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)
  
    const handleLeftClick = () => {
        // we don't want to push in React
        // we don't want to mutate state, we want to create new copies of objects
        // state in react updates asynchronously
        setAll(allClicks.concat("L"))
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right)
    }

  
    const handleRightClick = () => {
        setAll(allClicks.concat("R"))
        const updatedRight = right + 1
        setRight(updatedRight)
        setTotal(left + updatedRight)
     }

    // run debugger anywhere in code
    // debugger
 
  
    return (
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left"/>
        <Button onClick={handleRightClick} text="right"/>        
        {right}
        <History allClicks={allClicks}/>
        <p>{total}</p>
      </div>
    )
  }

  export default App