import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({ values }) => {
  if (values.good === 0 && values.neutral === 0 && values.bad === 0) {
    return (
      <p>No feedback gathered</p>
    )
  }
  const all = values.good + values.neutral + values.bad
  const average = ((values.good * 1) + (values.neutral * 0) + (values.bad * -1)) / all
  const positivePercentage = values.good / all * 100
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={values.good} />
          <StatisticsLine text="neutral" value={values.neutral} />
          <StatisticsLine text="bad" value={values.bad} />
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positivePercentage}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const values = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics values={values} />
    </div>
  )
}

export default App;
