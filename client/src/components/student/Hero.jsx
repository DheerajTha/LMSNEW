import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";

const Typewriter = ({ phrases, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhraseIndex];
    let timeout;

    if (!deleting && currentIndex <= phrase.length) {
      timeout = setTimeout(() => {
        setCurrentText(phrase.substring(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, delay);
    } else if (deleting && currentIndex >= 0) {
      timeout = setTimeout(() => {
        setCurrentText(phrase.substring(0, currentIndex));
        setCurrentIndex(currentIndex - 1);
      }, delay / 2);
    } else {
      timeout = setTimeout(() => {
        setDeleting(!deleting);
        if (!deleting) {
          setTimeout(() => setDeleting(true), 1000);
        } else {
          setCurrentIndex(0);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
          setDeleting(false);
        }
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, currentPhraseIndex, deleting, phrases, delay]);

  return <span className="inline-block">{currentText}</span>;
};

const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-32 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-6 sm:py-24 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6 z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-indigo-600">
              <Typewriter 
                phrases={[
                  "Unlock Your Learning Journey",
                  "Shape Your Future with Us",
                  "Grow With Each Lesson"
                ]} 
              />
            </span>
            <span className="block mt-3 relative">
              <span className="relative z-10">Interactive Learning</span>
            </span>
          </h1>

          <p className="text-base text-gray-600 leading-relaxed animate-fadeIn">
            Join our community of passionate learners and unlock your potential with 
            industry-leading courses taught by world-class instructors.
          </p>

          <div className="pt-4 animate-fadeInUp">
            <Searchbar />
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2 relative z-10">
          <div className="relative overflow-hidden rounded-2xl transform hover:scale-105 transition-all duration-700">
            <img
              src="/assets/hero.jpg"
              alt="Students learning together"
              className="w-full h-auto object-cover"
              width={600}
              height={400}
            />
          </div>

          {/* Badges */}
          <div className="absolute top-0 right-0 translate-x-2 sm:translate-x-8 -translate-y-8 bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-lg flex items-center space-x-3 border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fadeInRight">
            <div className="text-4xl sm:text-5xl">🚀</div>
            <div className="text-left">
              <p className="text-sm sm:text-lg font-bold text-gray-900">
                Your Success Story Starts
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Achieve what you deserve</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 -translate-x-2 sm:-translate-x-8 -translate-y-8 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-lg flex items-center space-x-2 border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fadeInLeft">
            <div className="text-4xl text-purple-600">📘</div>
            <div className="text-left">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                Aim Higher, Achieve More
              </p>
              <p className="text-xs text-gray-600">
                Focused learning, real growth
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out both;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out 0.3s both;
        }
        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out 0.5s both;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out 0.5s both;
        }
      `}</style>
    </section>
  );
};

export default Hero;