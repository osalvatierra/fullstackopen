// Define the type for props
import { TotalProps } from "../types/course";

// Combine both types for the component props

function Content({ parts }: TotalProps) {
  const total = parts.reduce((s, p) => {
    console.log("What is happing", s, p);
    return s + p.exercises;
  }, 0);

  console.log(total);
  return (
    <div>
      <p>
        <strong>Overall Total Number of exercises:</strong> {total}
      </p>
    </div>
  );
}

export default Content;
