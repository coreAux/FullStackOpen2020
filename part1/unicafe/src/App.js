import { useState } from "react";
//import logo from './logo.svg';
import "./App.css";

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const Feedback = ({ incrementGood, incrementNeutral, incrementBad }) => {
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={incrementGood} text="GOOD" />
      <Button handleClick={incrementNeutral} text="NEUTRAL" />
      <Button handleClick={incrementBad} text="BAD" />
    </div>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}:</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  // Calculate all feedback, average and percentage of positive feedback
  let all = good + neutral + bad;
  let average = (
    (good * 1 + bad * -1 + neutral * 0) /
    (good + neutral + bad)
  ).toFixed(2);
  let positive = ((good / (good + bad + neutral)) * 100).toFixed(2) + " %";

  if (good || neutral || bad) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={all} />
            <Statistic text="Average" value={average} />
            <Statistic text="Positive" value={positive} />
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given yet...</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (item, setItem) => {
    setItem(item + 1);
  };

  return (
    <div className="App">
      <Feedback
        incrementGood={() => handleClick(good, setGood)}
        incrementNeutral={() => handleClick(neutral, setNeutral)}
        incrementBad={() => handleClick(bad, setBad)}
      />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
