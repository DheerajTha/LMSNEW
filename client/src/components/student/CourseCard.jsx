import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";

const CourseCard = ({ course }) => {
  const { currency, calCulateRating } = useContext(AppContext);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-100">
      <Link
        to={"/course/" + course._id}
        onClick={() => window.scrollTo(0, 0)}
        className="block"
      >
        {/* Image with overlay effect */}
        <div className="relative pb-[56.25%] overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Discount badge */}
          {course.discount > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
              {course.discount}% OFF
            </div>
          )}
        </div>

        {/* Course content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-indigo-600 transition-colors">
            {course.courseTitle}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex items-center">
            {course.educator.name}
          </p>

          {/* Rating */}
          <div className="flex items-center   mb-4">
            <span className="text-sm font-medium text-gray-700 mr-1">
              {calCulateRating(course)}
            </span>
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((_, i) => {
                const filled = i < Math.floor(calCulateRating(course));
                return (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill={filled ? "#facc15" : "none"}
                    viewBox="0 0 24 24"
                    stroke="#facc15"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 
               1.371 1.24.588 1.81l-3.976 2.888a1 1 0 
               00-.363 1.118l1.518 4.674c.3.922-.755 
               1.688-1.54 1.118l-3.976-2.888a1 1 0 
               00-1.176 0l-3.976 2.888c-.784.57-1.84-.196-1.54-1.118l1.519-4.674a1 1 0 
               00-.363-1.118L2.078 10.1c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 
               00.95-.69l1.519-4.674z"
                    />
                  </svg>
                );
              })}
            </div>

            <span className="text-xs ml-24 text-gray-800">
              {" "}
              {course.courseRatings.length}{" "}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <span className="text-lg font-bold text-gray-900">
                {currency}
                {(
                  course.coursePrice -
                  (course.discount * course.coursePrice) / 100
                ).toFixed(2)}
              </span>
              {course.discount > 0 && (
                <span className="ml-2 text-sm text-gray-400 line-through">
                  {currency}
                  {course.coursePrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors flex items-center">
              Enroll Now
              <svg
                className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
