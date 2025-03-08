import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({stats}) => {

  if (stats.all == 0) {
    return (
      <>
      <Header text="statistics"></Header>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <Header text="statistics"></Header>

      <table>
        <thead>
          <StatisticLine text="good" value ={stats.good} />
          <StatisticLine text="neutral" value ={stats.neutral} />
          <StatisticLine text="bad" value ={stats.bad} />
          <StatisticLine text="all" value ={stats.all} />
          <StatisticLine text="average" value ={stats.average} />
          <StatisticLine text="percent" value ={stats.percent + " %"} />
        </thead>
      </table>
    </>
  )
  
  
}

const App = () => {
  const new_stats = {
    "good" : 0,
    "neutral" : 0,
    "bad" : 0,
    "all" : 0,
    "average": 0,
    "percent": 0
  }


  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [percent, setPercent] = useState(0)

  const stats = {
    "good" : good,
    "neutral" : neutral,
    "bad" : bad,
    "all" : all,
    "average": average,
    "percent": percent
  }

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
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Statistics stats={stats}></Statistics>
    </div>
  )
}

export default App