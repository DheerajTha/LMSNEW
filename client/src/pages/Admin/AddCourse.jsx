import React, { useEffect, useRef, useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiUpload,
  FiVideo,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAuth } from "@clerk/clerk-react";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const { getToken } = useAuth();

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showChapterPopup, setShowChapterPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // Initialize Quill editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [
              { header: 1 },
              { header: 2 },
              { header: 3 },
              { header: 4 },
              { header: 5 },
            ],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
        placeholder: "Write your course description here...",
      });
    }

    editorRef.current.style.height = "256px";
    editorRef.current.style.maxHeight = "150px";
    editorRef.current.style.overflowY = "auto";
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!courseTitle.trim()) {
      newErrors.courseTitle = "Course title is required";
    }

    if (!quillRef.current || quillRef.current.getText().trim().length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }

    if (coursePrice < 0) {
      newErrors.coursePrice = "Price cannot be negative";
    }

    if (discount < 0 || discount > 100) {
      newErrors.discount = "Discount must be between 0 and 100";
    }

    if (!imageFile) {
      newErrors.image = "Course thumbnail is required";
    }

    if (chapters.length === 0) {
      newErrors.chapters = "At least one chapter is required";
    } else {
      for (const chapter of chapters) {
        if (chapter.lectures.length === 0) {
          newErrors.chapters = "Each chapter must have at least one lecture";
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const addChapter = () => {
    const newChapter = {
      id: Date.now().toString(),
      title: `Chapter ${chapters.length + 1}`,
      lectures: [],
    };
    setChapters([...chapters, newChapter]);
  };

  const addLecture = (chapterId) => {
    setCurrentChapterId(chapterId);
    setShowChapterPopup(true);
  };

  const saveLecture = () => {
    if (!currentChapterId) return;

    if (
      !lectureDetails.lectureTitle ||
      !lectureDetails.lectureDuration ||
      !lectureDetails.lectureUrl
    ) {
      alert("Please fill all lecture details");
      return;
    }

    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === currentChapterId) {
        return {
          ...chapter,
          lectures: [
            ...chapter.lectures,
            {
              ...lectureDetails,
              id: Date.now().toString(),
            },
          ],
        };
      }
      return chapter;
    });

    setChapters(updatedChapters);
    setShowChapterPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the HTML content from Quill editor
      const description = quillRef.current.root.innerHTML;

      // Transform chapters to match backend schema
      const transformedChapters = chapters.map((chapter, chapterIndex) => ({
        chapterId: chapter.id,
        chapterOrder: chapterIndex + 1,
        chapterTitle: chapter.title,
        chapterContent: chapter.lectures.map((lecture, lectureIndex) => ({
          lectureId: lecture.id,
          lectureTitle: lecture.lectureTitle,
          lectureDuration: parseInt(lecture.lectureDuration),
          lectureUrl: lecture.lectureUrl,
          isPreviewFree: lecture.isPreviewFree,
          lectureOrder: lectureIndex + 1
        }))
      }));

      // Prepare course data object
      const courseData = {
        courseTitle,
        courseDescription: description,
        coursePrice: coursePrice.toString(), // Model expects string
        discount,
        courseContent: transformedChapters
      };

      // Prepare form data
      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("thumbnail", imageFile);

      // Get authentication token
      const token = await getToken();

      // Send the data to your backend
      const response = await fetch('/api/educator/add-course', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to create course');
      }
      
      const result = await response.json();
      console.log('Course created:', result);

      if (result.success) {
        alert("Course created successfully!");
      } else {
        throw new Error(result.message || 'Failed to create course');
      }
      // Reset form after successful submission
      setCourseTitle("");
      setCoursePrice(0);
      setDiscount(0);
      setImage(null);
      setImageFile(null);
      setChapters([]);
      if (quillRef.current) {
        quillRef.current.setContents([]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error creating course: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Create New Course
      </h1>

      <form
        onSubmit={handleSubmit} enctype="multipart/form-data"
        className="bg-white rounded-lg relative cursor-pointer shadow-md p-6"
      >
        {/* Course Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Course Title *
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 border ${
              errors.courseTitle ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
          {errors.courseTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.courseTitle}</p>
          )}
        </div>

        {/* Course Description */}
        <div className="mb-6 " >
          <label className="block text-gray-700 font-medium mb-2">
            Course Description *
          </label>
          <div
            ref={editorRef}
            className={`border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg h-64 mb-2`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Pricing Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Course Price ($)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="text-gray-400" />
              </div>
              <input
                type="number"
                className={`w-full pl-8 px-4 py-2 border ${
                  errors.coursePrice ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                value={coursePrice}
                onChange={(e) => setCoursePrice(Number(e.target.value))}
                min="0"
              />
              {errors.coursePrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.coursePrice}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Discount (%)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTag className="text-gray-400" />
              </div>
              <input
                type="number"
                className={`w-full pl-8 px-4 py-2 border ${
                  errors.discount ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                min="0"
                max="100"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
              )}
            </div>
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Course Thumbnail *
          </label>
          <div className="flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <FiUpload className="mr-2" />
              Upload Image
            </button>
            {image && (
              <img
                src={image}
                alt="Course thumbnail preview"
                className="ml-4 w-20 h-20 object-cover rounded-lg"
              />
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Course Chapters */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Course Chapters *
            </h2>
            <button
              type="button"
              onClick={addChapter}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Chapter
            </button>
          </div>

          {errors.chapters && (
            <p className="text-red-500 text-sm mb-2">{errors.chapters}</p>
          )}

          {chapters.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No chapters added yet
            </div>
          ) : (
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-800">
                      {chapter.title}
                    </h3>
                    <div className="space-x-2">
                      <button
                        type="button"
                        onClick={() => addLecture(chapter.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Add Lecture
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setChapters(
                            chapters.filter((c) => c.id !== chapter.id)
                          )
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  {chapter.lectures.length > 0 ? (
                    <ul className="space-y-2 pl-4">
                      {chapter.lectures.map((lecture) => (
                        <li
                          key={lecture.id}
                          className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="font-medium truncate">
                              {lecture.lectureTitle}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 ml-4">
                            <span className="text-sm text-gray-500 w-16 text-right">
                              {lecture.lectureDuration} min
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                lecture.isPreviewFree
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedChapters = chapters.map((c) => {
                                  if (c.id === chapter.id) {
                                    return {
                                      ...c,
                                      lectures: c.lectures.filter(
                                        (l) => l.id !== lecture.id
                                      ),
                                    };
                                  }
                                  return c;
                                });
                                setChapters(updatedChapters);
                              }}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Delete lecture"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No lectures added yet
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating Course..." : "Create Course"}
        </button>
      </form>

      {/* Lecture Popup */}
      {showChapterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Lecture</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  Lecture Title *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                  min="1"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Video URL *</label>
                <div className="flex items-center">
                  <FiVideo className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    placeholder="https://example.com/video"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="previewFree"
                  className="mr-2"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                />
                <label htmlFor="previewFree">Is preview Free? </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded"
                onClick={() => setShowChapterPopup(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={saveLecture}
              >
                Save Lecture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
