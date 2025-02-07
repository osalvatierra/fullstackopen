import { PartProps } from "../types/course";

function Part({ name, exercises }: PartProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Exercises: {exercises}</p>
    </div>
  );
}

export default Part;
