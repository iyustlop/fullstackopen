import { useState } from 'react'

const StatisticLine = props => <div>{props.text} {props.value}</div>

const Statistics = (props) => { 
  if (props.good === 0 && props.neutral === 0 && props.bad === 0){
    return (
      <p>No feedback given</p>
    )
  } 
  
  console.log(props)

  const all = props.good + props.neutral + props.bad
  console.log(all)

  const average = ((props.good - props.bad)/all)
  console.log(average || 0)

  const positive = ((props.good/all)*100 || 0).toString().concat(' %')
  console.log(positive || 0)

  return (
    <div>
      <StatisticLine text='good' value={props.good}></StatisticLine>
      <StatisticLine text='neutral' value={props.neutral}></StatisticLine>
      <StatisticLine text='bad' value={props.bad}></StatisticLine>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={average || 0}/>
      <StatisticLine text='positive' value={positive || 0}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>give feedback</h1>
          <Button handleClick={() => setGood(good + 1)} text="good" />
          <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
          <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </>
  )
}

export default App
