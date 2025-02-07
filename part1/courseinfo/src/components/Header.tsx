import { HeaderProps } from "./types/course";

function Header({ course }: { course: HeaderProps }) {
  return (
    <div>
      <h1>Header</h1>
      {course.map((course) => (
        <h1 key={course.id}>{course.name}</h1>
      ))}
    </div>
  );
}

// Header.propTypes = {
//   course: PropTypes.string.isRequired, // Adjust type if `course` is an object or number
// };

export default Header;
