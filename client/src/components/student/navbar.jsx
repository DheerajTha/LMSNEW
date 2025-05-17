import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px:14 lg:px-36 border-b border-gray-600 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-200/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src="../../../public/assets/logo.png"
        alt="Logo"
        className="w-26 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500 ">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate("/educator");
                }}
              >
                {" "}
                {isEducator ? "Educator Dashboard" : "Become Educator"}{" "}
              </button>{" "}
              |<Link to="/my-enrollments">My Enrollment</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
      {/* mob view */}
      <div className="md:hidden text-gray-700 flex items-center gap-2  sm:gap-5">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate("/educator");
                }}
              >
                {" "}
                {isEducator ? "Educator Dashboard" : "Become Educator"}{" "}
              </button>{" "}
              |<Link to="/my-enrollments">My Enrollment</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <FaUserCircle size={22} />{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
