import React from 'react';
import { useConnect } from '@stacks/connect-react';
import CourseEnrollment from '../components/CourseEnrollment';
import CourseCompletion from '../components/CourseCompletion';

function Student() {
  const { authentication } = useConnect();

  if (!authentication.isSignedIn()) {
    return <div>Please sign in to access the student dashboard.</div>;
  }

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <CourseEnrollment />
      <CourseCompletion />
    </div>
  );
}

export default Student;
