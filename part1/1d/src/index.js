import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Statistic = ({text, value}) => {
  return(
    <table>
      <tbody>
    <tr>
      <td>{text} {value}</td>
    </tr>
    </tbody>
    </table>
  )
}
const Statistics = ({feedback}) => {
const [good, neutral, bad] = feedback;
const all = feedback.reduce((a,b) => a + b);
const calcAverage = () => {
  const average = (good + 0*neutral + bad/-1) / all;
  if (isNaN(average)) return null;
  return average;
}
const calcPositive = () => {
  const positive = good/all;
  if (isNaN(positive)) return null;
  return (positive * 100 + '%');
}

if (!all) {
  return (
    <Statistic text="No feedback given" />
  )
}

  return (
    <>
      <Statistic text="Good" value={good} />
      <Statistic text="Neutral" value={neutral} />
      <Statistic text="Bad" value={bad} />
      <Statistic text="All" value={all} />
      <Statistic text="Average" value={calcAverage()} />
      <Statistic text="Positive" value={calcPositive()} />
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>
      <Statistics feedback={[good, neutral, bad]} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)