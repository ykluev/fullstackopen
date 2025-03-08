import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [percent, setPercent] = useState(0)


  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = updatedGood + bad + neutral
    const updatedAverage = (updatedGood - bad) / updatedAll
    setGood(updatedGood)
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPercent(100*(updatedGood/updatedAll))
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = good + updatedBad + neutral
    const updatedAverage = (good - updatedBad) / updatedAll
    setBad(updatedBad)
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPercent(100*(good/updatedAll))
  }


  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = good + bad + updatedNeutral
    const updatedAverage = (good - bad) / updatedAll
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPercent(100*(good/updatedAll))
  }

  return (
    <div>
      <Header text="give feedback"></Header>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <Header text="statistics"></Header>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {percent} %</p>
    </div>
  )
}

export default App