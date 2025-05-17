import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Searchbar from "../../components/student/Searchbar";
import { AppContext } from "../../context/AppContext";
import CourseCard from "../../components/student/CourseCard";
import { RxCross1 } from "react-icons/rx";

const CourseList = () => {
  const { input } = useParams();
  const { allCourses, navigate } = useContext(AppContext);
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses?.length) {
      const tempCourses = [...allCourses];
      setFilteredCourse(
        input
          ? tempCourses.filter(course =>
              course.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          : tempCourses
      );
    }
  }, [allCourses, input]);

  return (
    <div className="relative px-4 sm:px-10 md:px-20 pt-24">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Course List
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Home
            </Link>{" "}
            / <span className="font-semibold">Course List</span>
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <Searchbar data={input} />
        </div>
      </div>

      {/* Filter Tag */}
      {input && (
        <div className="inline-flex items-center gap-3 px-4 py-2 border mt-8 text-sm text-gray-700 rounded-md bg-gray-100 w-fit">
          <p className="capitalize">{input}</p>
          <RxCross1
            className="cursor-pointer hover:text-red-500"
            onClick={() => navigate("/course-list")}
          />
        </div>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {filteredCourse.length > 0 ? (
          filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-20">
            No courses found matching "<strong>{input}</strong>"
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
