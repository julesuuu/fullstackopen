import { useState } from 'react'

const Statistics = (props) => { 
  console.log(props.all)
  if (props.all === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={props.good} /> 
        <StatisticLine text={"neutral"} value={props.neutral} />
        <StatisticLine text={"bad"} value={props.bad} />
        <StatisticLine text={"all"} value={props.all} />
        <StatisticLine text={"average"} value={props.average} />
        <StatisticLine text={"positive"} value={props.positive} />
      </tbody>
    </table>
    )
}

const StatisticLine = ({ text, value }) => {
  console.log(text)
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newGood) => {
    setGood(newGood)
    console.log('good' ,  newGood)
  }

  const setToNeutral = (newNeutral) => {
    setNeutral(newNeutral)
    console.log('neutral', newNeutral)
  }

  const setToBad = (newBad) => {
    setBad(newBad)
    console.log('bad', newBad)
  }

  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=> setToGood(good + 1)} text="good" />
      <Button onClick={()=> setToNeutral(neutral + 1)} text="neutral" />
      <Button onClick={()=> setToBad(bad + 1)} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />

    </div>
  )
}

export default App


