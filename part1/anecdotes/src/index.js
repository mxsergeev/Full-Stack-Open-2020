import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat));

  const pickRandomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    while (random == selected) {
      random = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(random);
  }
  const addVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const getMaxOfArray = (numArray) => {
    return Math.max.apply(null, numArray);
  }
  const mostVotedAnecdote = votes.indexOf(getMaxOfArray(votes));

  return (
    <div>
      <Anecdote text="Anecdote of the day" anecdotes={anecdotes} votes={votes} selected={selected} />
      <Button handleClick={pickRandomAnecdote} text="Next anecdote" />
      <Button handleClick={addVote} text="Vote" />

      <Anecdote text="Anecdote with most votes" anecdotes={anecdotes} votes={votes} selected={mostVotedAnecdote} />
    </div>
  )
}

const Anecdote = ({ anecdotes, votes, selected, text }) => {
  return (
    <>
      <h1>{text}</h1>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
    </>
  )
}

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)