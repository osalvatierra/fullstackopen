// Define the type for props
type HeaderProps = {
  course: string; // Change `string` to the correct type if `course` is an object or another type
};

function Header({ course }: HeaderProps) {
  return (
    <div>
      <h1>Header</h1>
      <h1>{course}</h1>
    </div>
  );
}

// Header.propTypes = {
//   course: PropTypes.string.isRequired, // Adjust type if `course` is an object or number
// };

export default Header;
