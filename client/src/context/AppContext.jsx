import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../../public/assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();

  // fetch data

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  //   cal to rating

  const calCulateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  // calculate to Chapter Time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // calculate course  duration
  const calculateCOurseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // calculate tp no of lecture

  const calculateNoOfLecture = (course) => {
    let totoalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totoalLectures += chapter.chapterContent.length;
      }
    });

    return totoalLectures;
  };

  // fetch user enrolled Courses

  const fetchUserEnrolledCourses = async () =>{
    setEnrolledCourses(dummyCourses)
  }

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calCulateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCOurseDuration,
    calculateNoOfLecture,
    enrolledCourses,
    fetchUserEnrolledCourses,

  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
