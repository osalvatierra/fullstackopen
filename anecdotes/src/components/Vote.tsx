// Define the type for props
type VoteProps = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>; // Change `string` to the correct type if `course` is an object or another type
  text: string;
  value: number;
};

function Vote({ handleClick, text, value }: VoteProps) {
  return (
    <div>
      Has {value} Votes
      <br />
      <button onClick={handleClick}>{text}</button>
    </div>
  );
}

// Header.propTypes = {
//   course: PropTypes.string.isRequired, // Adjust type if `course` is an object or number
// };

export default Vote;
