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

  console.log("The Component Rendered")

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBad = () => {
    setBad(bad + 1)
  }

  const all = (good, neutral, bad) => {
    return (good + neutral + bad);
  }

  const average = (good, neutral, bad) => {
    return ((good - bad)/all(good, neutral, bad));
  }

  const positive = (good, neutral, bad) => {
    return ((good/(good + neutral + bad))*100);
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
      <StatisticsLine text="all" value={all(good, neutral, bad)} /> 
      <StatisticsLine text="average" value={average(good, neutral, bad)} /> 
      <StatisticsLine text="positive" value={`${positive(good, neutral, bad)} %`}/>
    </div>
  )
}

export default App