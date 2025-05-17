import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { dummyDashboardData } from '../../../public/assets/assets';
import Loading from '../../components/student/Loading';
import { FiUsers, FiBookOpen, FiDollarSign } from 'react-icons/fi';

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboard, setDashboard] = useState(null);

  const fetchDashboardData = async () => {
    // Simulate API delay if needed
    setTimeout(() => {
      setDashboard(dummyDashboardData);
    }, 500);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboard) return <Loading />;

  const stats = [
    {
      label: 'Total Enrollments',
      value: dashboard.enrolledStudentsData.length,
      icon: <FiUsers size={22} />,
    },
    {
      label: 'Total Courses',
      value: dashboard.totalCourses,
      icon: <FiBookOpen size={22} />,
    },
    {
      label: 'Total Earnings',
      value: `${currency} ${dashboard.totalEarnings}`,
      icon: <FiDollarSign size={22} />,
    },
  ];

  return (
    <div className="p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-blue-100 shadow-sm rounded-lg flex items-center p-4 space-x-4 hover:shadow-md transition"
          >
            <div className="text-blue-600 bg-blue-100 p-3 rounded-full">
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Enrollments Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-700 px-4 py-3 border-b">
          Latest Enrollments
        </h3>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Student name</th>
              <th className="px-4 py-3 font-medium">Course Title</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.enrolledStudentsData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src={item.student.imageUrl}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  {item.student.name}
                </td>
                <td className="px-4 py-3">{item.courseTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
