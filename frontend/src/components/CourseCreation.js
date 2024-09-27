import React, { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { contractPrincipal } from '../utils/contracts';

function CourseCreation() {
  const { doContractCall } = useConnect();
  const [courseName, setCourseName] = useState('');
  const [coursePrice, setCoursePrice] = useState('');

  const handleCourseCreation = async () => {
    if (!courseName || !coursePrice) return;

    try {
      await doContractCall({
        contractAddress: contractPrincipal,
        contractName: 'educationnect',
        functionName: 'create-course',
        functionArgs: [courseName, coursePrice],
        onFinish: data => {
          console.log('Course created:', data);
          // Handle successful course creation (e.g., show success message, clear form)
        },
        onCancel: () => {
          console.log('Transaction canceled');
        }
      });
    } catch (e) {
      console.error('Failed to create course:', e);
    }
  };

  return (
    <div className="course-creation">
      <h2>Create a New Course</h2>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course Name"
      />
      <input
        type="number"
        value={coursePrice}
        onChange={(e) => setCoursePrice(e.target.value)}
        placeholder="Course Price"
      />
      <button onClick={handleCourseCreation}>Create Course</button>
    </div>
  );
}

export default CourseCreation;
