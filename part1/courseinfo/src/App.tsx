import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
const course = "Half Stack application development";

const parts = [
  { name: "Part 1", exercises: 10 },
  { name: "Part 2", exercises: 7 },
  { name: "Part 3", exercises: 14 },
];
const App = () => {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
