import React from 'react'
import Hero from '../../components/student/Hero';
import CoursesSection from '../../components/student/CourseSection';

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7'>
      <Hero/>
      <CoursesSection/>
      
    </div>
  )
}

export default Home;
