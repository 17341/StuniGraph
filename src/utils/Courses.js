import CoursesDict from "./CoursesDict";

const Courses = Object.keys(CoursesDict).map((grade) => {
  return {
    title: grade,
    value: grade,
    children: CoursesDict[grade].map((course) => {
      return { title: course.name, value: course.code };
    }),
  };
});

export default Courses;
