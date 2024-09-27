import React, { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { contractPrincipal } from '../utils/contracts';

function CourseEnrollment() {
  const { doContractCall } = useConnect();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    // Fetch available courses
    // This would typically involve calling a read-only function on your smart contract
    // For now, we'll use dummy data
    setCourses([
      { id: 1, name: 'Introduction to Blockchain' },
      { id: 2, name: 'Advanced Smart Contracts' },
      { id: 3, name: 'Decentralized Finance' },
    ]);
  }, []);

  const handleEnrollment = async () => {
    if (!selectedCourse) return;

    try {
      await doContractCall({
        contractAddress: contractPrincipal,
        contractName: 'educationnect',
        functionName: 'enroll-in-course',
        functionArgs: [selectedCourse],
        onFinish: data => {
          console.log('Enrolled in course:', data);
          // Handle successful enrollment (e.g., show success message, update UI)
        },
        onCancel: () => {
          console.log('Transaction canceled');
        }
      });
    } catch (e) {
      console.error('Failed to enroll in course:', e);
    }
  };

  return (
    <div className="course-enrollment">
      <h2>Enroll in a Course</h2>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select a course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
      <button onClick={handleEnrollment}>Enroll</button>
    </div>
  );
}

export default CourseEnrollment;
