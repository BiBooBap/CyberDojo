import React, { useEffect, useState } from "react";
import courseFacade from "../services/courseFacade";
import { jwtDecode } from "jwt-decode";

const HomePage = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const isTokenValid = (token) => {
    if (!token) {
      return false;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let data = null;
        if (!isTokenValid(token)) {
          // Utente non autenticato
          data = await courseFacade.getAllCoursesGuest();
        } else {
          // Utente autenticato
          data = await courseFacade.getAllCoursesUser();
        }
        setCourses(data);
      } catch (error) {
        console.error("Errore nel recupero dei corsi", error);
        setError(error.message);
      }
    };
    fetchCourses();
  }, [token]);

  const introductionCourses = courses.filter(
    (course) => course.difficulty === "Facile"
  );
  const intermediateCourses = courses.filter(
    (course) => course.difficulty === "Medio"
  );
  const advancedCourses = courses.filter(
    (course) => course.difficulty === "Difficile"
  );

  const handleButtonClick = async (course, event) => {
    if (!user) {
      alert("È necessario registrarsi per iscriversi ai corsi.");
    } else {
      const button = event.target;
      const originalText = button.textContent;

      if (originalText === "Riprendi" || originalText === "Ripeti") {
        window.location.href = "/coursePage/?corso=" + course._id;
      } else {
        button.disabled = true;
        button.textContent = "Iscrizione in corso...";

        try {
          await courseFacade.enrollCourse(course._id);
          button.textContent = "Riprendi";
          alert("Iscrizione avvenuta con successo!");
          window.location.reload();
        } catch (error) {
          console.error("Errore durante l'iscrizione al corso:", error);
          button.textContent = originalText;
          alert("Errore durante l'iscrizione al corso.");
        } finally {
          button.disabled = false;
        }
      }
    }
  };

  console.log(
    "User enrolled courses:",
    user ? user.enrolled_courses : "No user"
  );

  return (
    <div className="px-8 py-4">
      <h1 className="font-Montserrat font-bold text-center text-xl mb-6 mt-6">
        Panoramica corsi
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className={`card-body relative h-72 w-72 rounded-lg shadow-lg transition-all duration-500 [transform-style:preserve-3d] ${
                !user ? "group hover:[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Fronte della card */}
              <div className="absolute inset-0 rounded-lg [backface-visibility:hidden] flex flex-col justify-between items-center p-6">
                <div>
                  <img
                    src={course.course_image}
                    alt="Foto corso"
                    className="logo w-14 h-14 mb-4 justify-self-center"
                  />
                  <h3 className="font-bold text-lg text-center mb-2">
                    {course.name}
                  </h3>
                  <p className="text-xs mb-4 text-center">
                    Livello difficoltà: {course.difficulty}
                  </p>
                </div>
                <button
                  className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
                  onClick={(event) => handleButtonClick(course, event)}
                >
                  {user
                    ? course.isEnrolled
                      ? course.isCompleted
                        ? "Ripeti"
                        : "Riprendi"
                      : "Iscriviti"
                    : "Iscriviti"}
                </button>
              </div>
              {/* Retro della card con la descrizione del corso */}
              <div className="card-body absolute inset-0 h-full w-full rounded-lg px-6 py-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                <p className="text-black">{course.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <h1 className="font-Montserrat font-bold text-center text-xl mb-6 mt-6">
        Corsi introduttivi
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          introductionCourses.map((course) => (
            <div
              key={course._id}
              className={`card-body relative h-72 w-72 rounded-lg shadow-lg transition-all duration-500 [transform-style:preserve-3d] ${
                !user ? "group hover:[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Front card */}
              <div className="absolute inset-0 rounded-lg [backface-visibility:hidden] flex flex-col justify-between items-center p-6">
                <div>
                  <img
                    src={course.course_image}
                    alt="Foto corso"
                    className="logo w-14 h-14 mb-4 justify-self-center"
                  />
                  <h3 className="font-bold text-lg text-center mb-2">
                    {course.name}
                  </h3>
                  <p className="text-xs mb-4 text-center">
                    Livello difficoltà: {course.difficulty}
                  </p>
                </div>
                <button
                  className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
                  onClick={(event) => handleButtonClick(course, event)}
                >
                  {user
                    ? course.isEnrolled
                      ? course.isCompleted
                        ? "Ripeti"
                        : "Riprendi"
                      : "Iscriviti"
                    : "Iscriviti"}
                </button>
              </div>
              {/* Retro della card con la descrizione del corso */}
              <div className="card-body absolute inset-0 h-full w-full rounded-lg px-6 py-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                <p className="text-black">{course.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <h1 className="font-Montserrat font-bold text-center text-xl mb-6 mt-6">
        Corsi intermedi
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          intermediateCourses.map((course) => (
            <div
              key={course._id}
              className={`card-body relative h-72 w-72 rounded-lg shadow-lg transition-all duration-500 [transform-style:preserve-3d] ${
                !user ? "group hover:[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/*Front Card*/}
              <div className="absolute inset-0 rounded-lg [backface-visibility:hidden] flex flex-col justify-between items-center p-6">
                <div>
                  <img
                    src={course.course_image}
                    alt="Foto corso"
                    className="logo w-14 h-14 mb-4 justify-self-center"
                  />
                  <h3 className="font-bold text-lg text-center mb-2">
                    {course.name}
                  </h3>
                  <p className="text-xs mb-4 text-center">
                    Livello difficoltà: {course.difficulty}
                  </p>
                </div>
                <button
                  className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
                  onClick={(event) => handleButtonClick(course, event)}
                >
                  {user
                    ? course.isEnrolled
                      ? course.isCompleted
                        ? "Ripeti"
                        : "Riprendi"
                      : "Iscriviti"
                    : "Iscriviti"}
                </button>
              </div>
              {/* Retro della card con la descrizione del corso */}
              <div className="card-body absolute inset-0 h-full w-full rounded-lg px-6 py-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                <p className="text-black">{course.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <h1 className="font-Montserrat font-bold text-center text-xl mb-6 mt-6">
        Corsi avanzati
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          advancedCourses.map((course) => (
            <div
              key={course._id}
              className={`card-body relative h-72 w-72 rounded-lg shadow-lg transition-all duration-500 [transform-style:preserve-3d] ${
                !user ? "group hover:[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Fronte della card */}
              <div className="absolute inset-0 rounded-lg [backface-visibility:hidden] flex flex-col justify-between items-center p-6">
                <div>
                  <img
                    src={course.course_image}
                    alt="Foto corso"
                    className="logo w-14 h-14 mb-4 justify-self-center"
                  />
                  <h3 className="font-bold text-lg text-center mb-2">
                    {course.name}
                  </h3>
                  <p className="text-xs mb-4 text-center">
                    Livello difficoltà: {course.difficulty}
                  </p>
                </div>
                <button
                  className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
                  onClick={(event) => handleButtonClick(course, event)}
                >
                  {user
                    ? course.isEnrolled
                      ? course.isCompleted
                        ? "Ripeti"
                        : "Riprendi"
                      : "Iscriviti"
                    : "Iscriviti"}
                </button>
              </div>
              {/* Retro della card con la descrizione del corso */}
              <div className="card-body absolute inset-0 h-full w-full rounded-lg px-6 py-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                <p className="text-black">{course.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
