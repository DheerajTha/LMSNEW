import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const MyEnrollments = () => {
  const { enrolledCourses, navigate, calculateCOurseDuration } = useContext(AppContext);

  const [progressArry, setProgressArry] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 5 },
    { lectureCompleted: 4, totalLectures: 5 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 2 },
    { lectureCompleted: 6, totalLectures: 6 },
    { lectureCompleted: 2, totalLectures: 1 },
    { lectureCompleted: 4, totalLectures: 4 },
  ]);

  return (
    <div className="px-4 md:px-12 py-10">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">My Enrollments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm md:text-base">
            <tr>
              <th className="px-4 py-3 font-semibold">Course</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Completed</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="text-sm md:text-base text-gray-700">
            {enrolledCourses.map((course, index) => {
              const progress = progressArry[index] || { lectureCompleted: 0, totalLectures: 1 };
              const percent = Math.min(
                Math.round((progress.lectureCompleted / progress.totalLectures) * 100),
                100
              );

              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-4 flex items-center gap-4">
                    <img
                      src={course.courseThumbnail}
                      alt=""
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <p className="font-medium">{course.courseTitle}</p>
                  </td>

                  <td className="px-4 py-4">{calculateCOurseDuration(course)}</td>

                  <td className="px-4 py-4">
                    <p className="mb-1">
                      {progress.lectureCompleted} / {progress.totalLectures} Lectures
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                    onClick={() => navigate('/player/' + course._id)}
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                        percent === 100
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {percent === 100 ? 'Completed' : 'Ongoing'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollments;
