export type Course = {
  id: number;
  name: string;
  parts: CoursePart[];
};

export type HeaderProps = {
  courses: Course[];
};

export type CoursePart = {
  id: number;
  name: string;
  exercises: number;
};

// Change this to accept an array of courses
export type CoursesProps = {
  courses: Course[];
  total: number;
};

export type PartProps = {
  id: number;
  name: string;
  exercises: number;
};

// Define the type for props
export type ContentProps = {
  courses: Course[];
};

// Define the type for props
export type TotalProps = {
  parts: Array<{ name: string; exercises: number }>;
};
