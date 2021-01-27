import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((a, x) => a + x.exercises, 0);
  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.map((part) => (
        <div key={part.id}>
          <Header course={part} />
          {part.parts.map((obj) => (
            <Part key={obj.id} part={obj} />
          ))}
          <Total course={part} />
        </div>
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

export default Course;
