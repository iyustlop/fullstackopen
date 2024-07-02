import { useState } from 'react'

const Display = props => <div>{props.text} {props.value}</div>

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
      <Display text='good' value={props.good}></Display>
      <Display text='neutral' value={props.neutral}></Display>
      <Display text='bad' value={props.bad}></Display>
      <Display text='all' value={all}/>
      <Display text='average' value={average || 0}/>
      <Display text='positive' value={positive || 0}/>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    const updateGood = good +1
    setGood(updateGood)
  }

  const handleClickNeutral = () => {
    const updateNeutral = neutral +1
    setNeutral(updateNeutral)
  }

  const handleClickBad = () => {
    const updateBad = bad +1
    setBad(updateBad)
  }

  return (
    <>
      <div>
        <h1>give feedback</h1>
          <button onClick={handleClickGood}>good</button>
          <button onClick={handleClickNeutral}>neutral</button>
          <button onClick={handleClickBad}>bad</button>
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </>
  )
}

export default App
