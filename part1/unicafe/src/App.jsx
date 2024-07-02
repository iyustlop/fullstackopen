import { useState } from 'react'

const Button = (props) => {
  console.log(props);
    return <button onClick={props.handleClick}>
    {props.text}
  </button>
}

const Display = props => <div>{props.text} {props.value}</div>

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </div>
      <div>
        <h1>statistics</h1>
        <Display value={good} text='good'></Display>
        <Display value={neutral} text='neutral'></Display>
        <Display value={bad} text='bad'></Display>
      </div>
    </>
  )
}

export default App
