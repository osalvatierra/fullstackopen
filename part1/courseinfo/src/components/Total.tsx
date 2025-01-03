// Define the type for props
type TotalProps = {
  parts: Array<{ name: string; exercises: number }>;
};
// Combine both types for the component props

function Content({ parts }: TotalProps) {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    </div>
  );
}

export default Content;
