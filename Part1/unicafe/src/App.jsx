import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({text}) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const StatisticsLine = ({text, value}) => {
  console.log("Text: ", text)
  console.log("Value: ", value)
  return (
    <div>
      <p>
        {text} {value}
      </p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  console.log("The Component Rendered")

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage((good - bad + 1)/(all + 1))
    setPositive(((good + 1)/(all + 1))*100)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad)/(all + 1))
    setPositive((good / (all + 1))*100)
  }
  
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - 1 - bad)/(all + 1))
    setPositive((good / (all + 1))*100)
  }

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header text="Statistics" />
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} /> 
      <StatisticsLine text="all" value={all} /> 
      <StatisticsLine text="average" value={average} /> 
      <StatisticsLine text="positive" value={`${positive} %`}/>
    </div>
  )
}

export default App