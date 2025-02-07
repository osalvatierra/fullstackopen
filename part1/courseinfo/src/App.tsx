import { Course } from "./types/course";

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const course: Course[] = [
  {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  },
  {
    name: "Node.js",
    id: 2,
    parts: [
      {
        name: "Routing",
        exercises: 3,
        id: 11,
      },
      {
        name: "Middlewares",
        exercises: 7,
        id: 12,
      },
    ],
  },
];

const App = () => {
  const sepParts = course.map((p) =>
    p.parts.flatMap((c) => c.exercises).reduce((s, p) => s + p, 0)
  );
  console.log("separate Parts", sepParts);

  return (
    <div>
      <Content courses={course} />
      <Total parts={course.flatMap((c) => c.parts)} />
    </div>
  );
};

export default App;
