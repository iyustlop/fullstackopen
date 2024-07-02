import { useState } from 'react'

const Display = props => <div>{props.text} {props.value}</div>

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState('0 %')

  const handleClickGood = () => {
    const updateGood = good +1
    setGood(updateGood)
    const updateAll = updateGood + neutral + bad
    setAll(updateAll)
    const updateAverage = average + 1
    console.log(average, updateAverage)
    setAverage(updateAverage)
    setPositive(((updateGood/updateAll)*100).toString().concat(' %'))
  }

  const handleClickNeutral = () => {
    const updateNeutral = neutral +1
    setNeutral(updateNeutral)
    const updateAll = good + updateNeutral + bad
    setAll(updateAll)
    const updateAverage = average+0
    console.log(average, updateAverage)
    setAverage(updateAverage)
    setPositive(((good/updateAll)*100).toString().concat(' %'))
  }

  const handleClickBad = () => {
    const updateBad = bad +1
    setBad(updateBad)
    setAll(good + neutral + updateBad)
    const updateAll = good + neutral + updateBad
    setAll(updateAll)
    const updateAverage = average-1 
    console.log(average, updateAverage)
    setAverage(updateAverage)
    setPositive(((good/updateAll)*100).toString().concat(' %'))
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
        <Display value={good} text='good'></Display>
        <Display value={neutral} text='neutral'></Display>
        <Display value={bad} text='bad'></Display>
        <Display value={all} text='all'></Display>
        <Display value={average/all || 0} text='average'></Display>
        <Display value={positive} text='positive'></Display>
      </div>
    </>
  )
}

export default App
