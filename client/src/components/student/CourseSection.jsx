import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Animated heading */}
        <div className="text-center mb-12 overflow-hidden">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="relative">
              Learn from the best
              <span className="absolute bottom-0 left-0 h-1 w-full bg-indigo-600 origin-left scale-x-0 animate-grow"></span>
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto animate-fadeIn">
            Discover our top-rated courses across various categories. From coding
            and design to business and wellness, our courses are crafted to deliver
            results.
          </p>
        </div>

        {/* Course grid with staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {allCourses.slice(0, 4).map((course, index) => (
            <div 
              key={course._id} 
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Animated button */}
        <div className="text-center">
  <Link
    to="/course-list"
    onClick={() => window.scrollTo(0, 0)}
    className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group"
  >
    Browse All Courses
    <svg 
      className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </Link>
</div>
      </div>

      {/* Add these to your global CSS */}
      <style jsx>{`
        @keyframes grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-grow {
          animation: grow 0.8s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out 0.3s both;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default CoursesSection;
