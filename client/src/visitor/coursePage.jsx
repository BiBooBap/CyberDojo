import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import courseFacade from "../services/courseFacade";

function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("corso");
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null); // Stato per la lezione selezionata

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

  // Gestione dello scroll quando il modal è aperto
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

  // Funzione per gestire il clic sulla lezione
  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  // Funzione per chiudere il modal
  const closeModal = () => {
    setSelectedLesson(null);
  };

  // Funzione per passare alla prossima lezione
  const handleNextLesson = () => {
    const currentIndex = course.lessons.findIndex(
      (lesson) => lesson.name === selectedLesson.name
    );
    const nextLesson = course.lessons[currentIndex + 1];
    if (nextLesson) {
      setSelectedLesson(nextLesson);
      courseFacade.updateUserProgress(courseId,nextLesson.name);
    } else {
      // Chiudi il modal se non ci sono altre lezioni
      closeModal();
    }
  };

  // Funzione per tornare alla lezione precedente
  const handlePreviousLesson = () => {
    const currentIndex = course.lessons.findIndex(
      (lesson) => lesson.name === selectedLesson.name
    );
    const previousLesson = course.lessons[currentIndex - 1];
    if (previousLesson) {
      setSelectedLesson(previousLesson);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-8 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Sezione Titolo Corso */}
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

          {/* Final Quiz Button */}
          <button
            className="bg-yellow-500 text-white py-3 px-6 rounded-lg mb-8 flex items-center space-x-2"
            disabled={course.progress !== 100}
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

          {/* Card delle Lezioni */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {course.lessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-yellow-400 p-6 rounded-lg shadow-md flex items-start space-x-4 cursor-pointer"
                onClick={() => handleLessonClick(lesson)} // Gestore di clic
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

      {/* Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 relative">
            {/* Pulsante X per chiudere il modal */}
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
              {/* Pulsanti Lezione Precedente e Prossima Lezione */}
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
                className={`bg-green-500 text-white px-4 py-2 rounded ${
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursePage;
