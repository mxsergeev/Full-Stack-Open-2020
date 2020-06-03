import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Header(props) {
  return (
    <h1>{props.course.name}</h1>
  )
}

function Content(props) {
  return (
    props.course.parts.map(part => {
      return <Part name={part.name} exercises={part.exercises} />
    })
  )
}

function Total(props) {
  const exercises = props.course.parts.map(e => e.exercises);
  const total = exercises.reduce((a, b) => a + b);
  return (
    <p>Number of exercises {total}</p>
  )
}

function Part(props) {
  return(
    <p>
        {props.name} {props.exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const [ counter, setCounter ] = useState(0)

  return (
    <div>
      <Header course={course} />

      <Content course={course} />

      <Total course={course} />
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}> 
        zero
      </button>
      <div>{counter}</div>
    </div>
  )
  }

ReactDOM.render(<App />, document.getElementById('root'))