import Part from "../components/Part";
import { ContentProps } from "../types/course";

function Content({ courses }: ContentProps) {
  return (
    <div>
      {courses.map((course) => {
        const totalExercises = course.parts.reduce(
          (sum, part) => sum + part.exercises,
          0
        );

        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            {course.parts.map((part) => (
              <Part
                key={part.id}
                id={part.id}
                name={part.name}
                exercises={part.exercises}
              />
            ))}
            <p>
              <strong>Total exercises: {totalExercises}</strong>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Content;
