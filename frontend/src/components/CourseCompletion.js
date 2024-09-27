import React, { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { contractPrincipal } from '../utils/contracts';

function CourseCompletion() {
  const { doContractCall } = useConnect();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    // Fetch enrolled courses
    // This would typically involve calling a read-only function on your smart contract
    // For now, we'll use dummy data
    setEnrolledCourses([
      { id: 1, name: 'Introduction to Blockchain' },
      { id: 2, name: 'Advanced Smart Contracts' },
    ]);
  }, []);

  const handleCourseCompletion = async () => {
    if (!selectedCourse) return;

    try {
      await doContractCall({
        contractAddress: contractPrincipal,
        contractName: 'educationnect',
        functionName: 'complete-course',
        functionArgs: [selectedCourse],
        onFinish: data => {
          console.log('Course completed:', data);
          // Handle successful completion (e.g., show success message, update UI)
        },
        onCancel: () => {
          console.log('Transaction canceled');
        }
      });
    } catch (e) {
      console.error('Failed to complete course:', e);
    }
  };

  return (
    <div className="course-completion">
      <h2>Complete a Course</h2>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select a course</option>
        {enrolledCourses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
      <button onClick={handleCourseCompletion}>Mark as Completed</button>
    </div>
  );
}

export default CourseCompletion;
