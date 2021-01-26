import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = (props) => {
  const anecdotesLength = props.anecdotes.length;

  const votesArray = Array.from(props.anecdotes, (x) => 0);

  const randomNumber = () => Math.floor(Math.random() * anecdotesLength);

  const [selected, setSelected] = useState(randomNumber());
  const [votes, setVotes] = useState(votesArray);

  const topAnecdoteIndex = votes.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  const upVote = (sel) => {
    let copy = [...votes];
    copy[sel] += 1;
    setVotes(copy);
  };

  const handleClick = () => {
    setSelected(randomNumber());
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <div>
          <button onClick={() => upVote(selected)}>vote</button>
          <button onClick={handleClick}>next anecdote</button>
        </div>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[topAnecdoteIndex]}</p>
        <p>has {votes[topAnecdoteIndex]} votes</p>
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById("root")
);
