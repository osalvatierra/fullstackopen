import Part, { PartProps } from "../components/Part";

// Define the type for props
type ContentProps = {
  parts: PartProps[];
};

function Content({ parts }: ContentProps) {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
}

export default Content;
