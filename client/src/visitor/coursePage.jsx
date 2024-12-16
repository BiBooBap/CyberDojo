import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import courseFacade from "../services/courseFacade";

// CoursePage component
function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("corso");
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await courseFacade.getCourseById(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  // Disable scrolling when modal (pop-up) is open
  useEffect(() => {
    if (selectedLesson) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedLesson]);

  if (!course) {
    return <div>Loading...</div>;
  }

  // Handle click on lesson card
  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  // Close modal (pop-up)
  const closeModal = () => {
    setSelectedLesson(null);
    window.location.reload();
  };

  // Handle next lesson
  const handleNextLesson = () => {
    // Get the current lesson index
    const currentIndex = course.lessons.findIndex(
      (lesson) => lesson.name === selectedLesson.name
    );
    // Get the next lesson
    const nextLesson = course.lessons[currentIndex + 1];
    if (nextLesson) {
      setSelectedLesson(nextLesson);
      courseFacade.updateUserProgress(courseId, nextLesson.name);
    } else {
      closeModal();
    }
  };

  // Handle previous lesson
  const handlePreviousLesson = () => {
    const currentIndex = course.lessons.findIndex(
      (lesson) => lesson.name === selectedLesson.name
    );
    // Get the previous lesson
    const prevLesson = course.lessons[currentIndex - 1];
    if (prevLesson) {
      setSelectedLesson(prevLesson);
      courseFacade.updateUserProgress(courseId, prevLesson.name);
    }
  };

  // Handle final quiz
  const handleFinalQuiz = () => {
      window.location.href = `/quiz/${course.id}`;
  };

  // Return the CoursePage component
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-8 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Course title*/}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img src={course.icon} alt="Course Icon" className="w-32 h-32" />
              <h1 className="text-4xl font-bold">{course.title}</h1>
            </div>
            <div className="text-2xl font-semibold text-purple-600">
              {course.description}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>

          <button
            className="bg-yellow-500 text-white py-3 px-6 rounded-lg mb-8 flex items-center space-x-2"
            disabled={course.progress !== 100}
            onClick={course.progress === 100 ? () => setShowConfirmModal(true) : undefined}
          >
            <span className="font-bold">Quiz Finale</span>
            {course.progress === 100 ? (
              <span role="img" aria-label="unlock icon">
                🔓
              </span>
            ) : (
              <span role="img" aria-label="lock icon">
                🔒
              </span>
            )}
          </button>
          {/* Confirmation Pop-up */}
          {showConfirmModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <p>Sei sicuro di voler ripetere il test?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    No
                  </button>
                  <button
                    onClick={handleFinalQuiz}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Sì
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lesson Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {course.lessons.map((lesson, index) => (
              <div
                key={index}
                className={`bg-yellow-400 p-6 rounded-lg shadow-md flex items-start space-x-4 ${
                  lesson.completed ? 'cursor-pointer' : 'cursor-default opacity-50'
                }`}
                onClick={lesson.completed ? () => handleLessonClick(lesson) : undefined}
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">{lesson.name}</h2>
                </div>
                <div className="ml-auto">
                  {lesson.completed ? (
                    <span className="text-green-500 font-bold text-xl">✔️</span>
                  ) : (
                    <span className="text-gray-500 font-bold text-xl">⏳</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal (pop-up) */}
      {selectedLesson && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 relative">
            {/* Close button for the modal (pop-up) */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
              aria-label="Chiudi"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedLesson.name}</h2>
            <p>{selectedLesson.description}</p>
            <div className="flex justify-end mt-4">
              {/* Previous and Next Lesson Buttons */}
              {course.lessons.findIndex(
                (lesson) => lesson.id === selectedLesson.id
              ) !== course.lessons.length - 1 && (
                <>
                  <button
                    onClick={handlePreviousLesson}
                    className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${
                      course.lessons.findIndex(
                        (lesson) => lesson.id === selectedLesson.id
                      ) === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      course.lessons.findIndex(
                        (lesson) => lesson.id === selectedLesson.id
                      ) === 0
                    }
                  >
                    Lezione Precedente
                  </button>
                  <button
                    onClick={handleNextLesson}
                    className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${
                      course.lessons.findIndex(
                        (lesson) => lesson.id === selectedLesson.id
                      ) === course.lessons.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      course.lessons.findIndex(
                        (lesson) => lesson.id === selectedLesson.id
                      ) === course.lessons.length - 1
                    }
                  >
                    Prossima Lezione
                  </button>
                  {/*Quiz Button */}
                </>
              )}
              {course.lessons.findIndex(
                (lesson) => lesson.id === selectedLesson.id
              ) === course.lessons.length - 1 && (
                <Link
                to={`/quiz/${course.id}`}
                className="bg-green-500 text-white px-4 py-2 rounded ml-2 inline-block"
                >
                Quiz Finale
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursePage;
