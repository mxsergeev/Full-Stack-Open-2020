import React from 'react';
import Course from './course'

const App = ({ courses }) => {

    return (
      <>
      <h1>Web development curriculum</h1>
      <div>
        {courses.map(course => (
          <Course key={course.id} course={course} />
        ))}
      </div>
      </>
    )
}

export default App