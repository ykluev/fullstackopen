import { useState } from 'react'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [max_vote_idx, setMaxVotes] = useState(0)


  const handleClick = () => {
    let res = getRandomInt(anecdotes.length)
    while (res == selected) {
      res = getRandomInt(anecdotes.length)
    }
    setSelected(res)
  }

  const handleVote = () => {
    const votes_copy = [...votes]
    votes_copy[selected] += 1
    setVotes(votes_copy)

    if (votes_copy[selected] > votes_copy[max_vote_idx]) {
        setMaxVotes(selected)
    }
    
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max_vote_idx]}</p>
      <p>has {votes[max_vote_idx]} votes</p>

    </div>
  )
}

export default App