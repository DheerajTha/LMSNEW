import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

const EducatorMyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">My Courses</h2>
      </div>

      <table className="min-w-full text-sm border border-gray-200">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="text-left px-4 py-2">Course</th>
            <th className="text-left px-4 py-2">Earnings</th>
            <th className="text-left px-4 py-2">Students</th>
            <th className="text-left px-4 py-2">Published On</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const discount = course.discount || 0;
            const finalPrice = course.coursePrice - (discount * course.coursePrice) / 100;
            const earnings = Math.floor(course.enrolledStudents.length * finalPrice);
            const publishedDate = new Date(course.createdAt).toLocaleDateString();

            return (
              <tr key={course._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <span className="font-medium text-gray-800">{course.courseTitle}</span>
                </td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  {currency} {earnings}
                </td>
                <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                <td className="px-4 py-3 text-gray-500">{publishedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <Loading />
  );
};

export default EducatorMyCourses;
