interface CourseParts {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: { courseParts: CourseParts[] }) => {
  return courseParts.map((course, index) => (
    <p key={index}>
      {course.name} {course.exerciseCount}
    </p>
  ));
};

export default Content;
