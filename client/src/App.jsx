import { Route, Routes, useMatch } from "react-router-dom";
import "./App.css";
import Home from "./pages/student/Home";
import CourseList from "./pages/student/CourseList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
 import Dashboard from "./pages/Admin/Dashboard";
import AddCourse from "./pages/Admin/AddCourse";
import StudentsEnrolled from "./pages/Admin/StudentsEnrolled";
import Navbar from "./components/student/navbar";
import Footer from "./components/student/Footer";
import EducatorLayout from "./pages/Admin/Educator";
import EducatorMyCourses from "./pages/Admin/MyCourse";
import "quill/dist/quill.snow.css";

function App() {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <>
      <div className="text-default min-h-screen bg-white">
        {!isEducatorRoute && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="/course-list/:input" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:CourseId" element={<Player />} />
          <Route path="/loading/:path" element={<Loading />} />
          
          {/* Educator Routes */}
          <Route path="/educator" element={<EducatorLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-course" element={<AddCourse />} />
        <Route path="my-courses" element={<EducatorMyCourses />} /> {/* Fixed path */}
        <Route path="student-enrolled" element={<StudentsEnrolled />} />
      </Route>
        </Routes>
        
        {!isEducatorRoute && <Footer />}
      </div>
    </>
  );
}

export default App;