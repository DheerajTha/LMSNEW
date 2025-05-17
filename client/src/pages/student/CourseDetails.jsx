import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { FaChevronDown, FaPlay } from "react-icons/fa";
import humanizeDuration from "humanize-duration";
import Youtube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calCulateRating,
    calculateChapterTime,
    calculateCOurseDuration,
    calculateNoOfLecture,
    currency,
  } = useContext(AppContext);

  useEffect(() => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!courseData) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {courseData.courseTitle}
            </h1>
            
            <div className="flex items-center flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-500 font-medium mr-1">
                  {calCulateRating(courseData)}
                </span>
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(calCulateRating(courseData)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({courseData.courseRatings.length} ratings)
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {courseData.enrolledStudents.length} students
              </span>
            </div>

            <div className="prose max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} />
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Course Curriculum
            </h2>
            
            <div className="space-y-2">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <FaChevronDown 
                        className={`mr-3 text-gray-500 transition-transform ${openSection[index] ? 'transform rotate-180' : ''}`} 
                      />
                      <h3 className="font-medium text-gray-900">
                        {chapter.chapterTitle}
                      </h3>
                    </div>
                    <div className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures • {calculateChapterTime(chapter)}
                    </div>
                  </button>
                  
                  <div className={`${openSection[index] ? 'block' : 'hidden'} border-t border-gray-200`}>
                    <ul className="divide-y divide-gray-200">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="px-4 py-3 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <FaPlay className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-800">{lecture.lectureTitle}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              {lecture.isPreviewFree && (
                                <button
                                  onClick={() => setPlayerData({
                                    videoId: lecture.lectureUrl.split("/").pop()
                                  })}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  Preview
                                </button>
                              )}
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                  units: ["h", "m"]
                                })}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
            {/* Video Player */}
            <div className="relative">
              {playerData ? (
                <Youtube
                  videoId={playerData.videoId}
                  opts={{ playerVars: { autoplay: 1 } }}
                  iframeClassName="w-full aspect-video"
                />
              ) : (
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={courseData.courseThumbnail}
                    alt={courseData.courseTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {courseData.courseCategory}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {currency}{(courseData.discount * courseData.coursePrice / 100).toFixed(2)}
                  </span>
                  <span className="text-lg line-through text-gray-500">
                    {currency}{courseData.coursePrice}
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {courseData.discount}% OFF
                  </span>
                </div>
                <p className="text-sm text-red-600 mt-1">🕒 5 days left at this price!</p>
              </div>

              <div class="flex items-center text-sm text-gray-500 mt-2 space-x-4">
      <span>⭐ {calCulateRating(courseData)} </span>
      <span>🕒 {calculateCOurseDuration(courseData)}</span>
      <span>📘 {calculateNoOfLecture(courseData)} lessons</span>
    </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                {isAlreadyEnrolled ? "Continue Learning" : "Enroll Now"}
              </button>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-3">This course includes:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;