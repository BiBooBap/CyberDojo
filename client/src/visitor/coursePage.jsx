import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import courseFacade from "../services/courseFacade";

function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("corso");
  const [course, setCourse] = useState(null);

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

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-auto font-Montserrat h-screen md:inline-flex p-8 bg-white ms:flex">
      {/* Progress Bar */}
      <div>
        <img src={course.icon} alt="Course Icon" className="w-72 h-72" />
        <div className="w-72 bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <div className="text-2xl font-semibold text-purple-600">
          {course.description}
        </div>
        <div>
          <button
            className="bg-yellow-500 text-white py-3 px-6 rounded-3xl space-x-2"
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
        </div>
      </div>

      {/* Course Title Section */}
      <div>
        <div className="flex items-center mx-8">
          <h1 className="text-4xl font-bold">{course.title}</h1>
        </div>
      </div>

      {/* Topics Section */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 flow max-w-md">
          {course.lessons.map((lesson, index) => (
            <div
              key={index}
              className="bg-yellow-400 p-6 rounded-2xl shadow-md space-x-4 mb-3"
            >
              <div className="flex justify-end">
                {lesson.completed ? (
                  <span className="text-green-500 font-bold text-xl">✔️</span>
                ) : (
                  <span className="text-gray-500 font-bold text-xl">⏳</span>
                )}
              </div>
              <div>
                <button className="text-2xl font-bold mb-2">
                  {lesson.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
