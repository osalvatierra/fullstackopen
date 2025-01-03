// Define the type for props
type ButtonProps = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>; // Change `string` to the correct type if `course` is an object or another type
  text: string;
};

function Button({ handleClick, text }: ButtonProps) {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
}

// Header.propTypes = {
//   course: PropTypes.string.isRequired, // Adjust type if `course` is an object or number
// };

export default Button;
