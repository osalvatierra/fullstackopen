import { useState } from "react";
import Button from "./components/Button";
import Stats from "./components/Stats";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = all / 3;
  const pos = (good / all) * 100;

  //Generic function to update any numbered state
  const setToValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    newValue: number
  ) => {
    console.log("value now", newValue);
    setter(newValue);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToValue(setGood, good + 1)} text="Good" />
      <Button
        handleClick={() => setToValue(setNeutral, neutral + 1)}
        text="Neutral"
      />
      <Button handleClick={() => setToValue(setBad, bad + 1)} text="Bad" />
      <h2>Statistics</h2>

      <Stats
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        pos={pos}
      />
    </div>
  );
};

export default App;
