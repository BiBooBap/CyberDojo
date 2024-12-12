import React, { useEffect, useState } from "react";
import courseFacade from "../services/courseFacade";

const HomePage = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseFacade.getAllCourses(token); //CONTROLLA SE IL TOKEN È PRESENTE (corretto). Non controlla se l'username esiste come definito nel backend
        setCourses(data);
      } catch (error) {
        console.error("Errore nel recupero dei corsi HOMEPAGE", error);
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  const introductionCourses = courses.filter(
    (course) => course.difficulty === "Facile"
  );
  const intermediateCourses = courses.filter(
    (course) => course.difficulty === "Medio"
  );
  const advancedCourses = courses.filter(
    (course) => course.difficulty === "Difficile"
  );

  const handleButtonClick = async (course) => {
    if (!user) {
      alert("È necessario registrarsi per iscriversi ai corsi.");
    } else {
      try {
        await courseFacade.enrollCourse(course.id);
        alert("Iscrizione avvenuta con successo!");
      } catch (error) {
        console.error("Errore durante l'iscrizione al corso:", error);
        alert("Errore durante l'iscrizione al corso.");
      }
    }
  };

  return (
    <div className="px-8 py-4">
      <h1 className="font-Montserrat font-bold flex lg:items-start items-center lg:justify-normal justify-center text-xl mb-3 mt-3">
        Panoramica corsi
      </h1>
      <div className="md:flex lg:flex-row justify-center lg:justify-normal space-x-3">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="card-body p-3 mb-3">
              <img
                src={course.icon}
                alt="Foto corso"
                className="logo w-14 h-14"
              />
              <h3 className="font-bold">{course.title}</h3>
              <p className="text-xs mb-1">
                Livello difficoltà: {course.difficulty}
              </p>
              {user && (
                <button
                  className="button-CD p-[7px] text-sm"
                  onClick={() => handleButtonClick(course)}
                >
                  {user
                    ? course.isEnrolled
                      ? course.isCompleted
                        ? "Ripeti"
                        : "Riprendi"
                      : "Iscriviti"
                    : "Iscriviti"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <h1 className="font-Montserrat font-bold flex lg:items-start items-center lg:justify-normal justify-center text-xl mb-3 mt-3">
        Corsi introduttivi
      </h1>
      <div className="md:flex lg:flex-row justify-center lg:justify-normal space-x-3">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          introductionCourses.map((course) => (
            <div key={course.id} className="card-body p-3 mb-3">
              <img
                src={course.icon}
                alt="Foto corso"
                className="logo w-14 h-14"
              />
              <h3 className="font-bold">{course.title}</h3>
              <p className="text-xs mb-1">
                Livello difficoltà: {course.difficulty}
              </p>
              {user && (
                <button
                  className="button-CD p-[7px] text-sm"
                  onClick={() => handleButtonClick(course)}
                >
                  {user
                    ? course.isEnrolled
                      ? course.isCompleted
                        ? "Ripeti"
                        : "Riprendi"
                      : "Iscriviti"
                    : "Iscriviti"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <h1 className="font-Montserrat font-bold flex lg:items-start items-center lg:justify-normal justify-center text-xl mb-3 mt-3">
        Corsi intermedi
      </h1>
      <div className="md:flex lg:flex-row justify-center lg:justify-normal space-x-3">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          intermediateCourses.map((course) => (
            <div key={course.id} className="card-body p-3 mb-3">
              <img
                src={course.icon}
                alt="Foto corso"
                className="logo w-14 h-14"
              />
              <h3 className="font-bold">{course.title}</h3>
              <p className="text-xs mb-1">
                Livello difficoltà: {course.difficulty}
              </p>
              {user && (
                <button
                  className="button-CD p-[7px] text-sm"
                  onClick={() => handleButtonClick(course)}
                >
                  {user
                    ? course.isEnrolled
                      ? course.isCompleted
                        ? "Ripeti"
                        : "Riprendi"
                      : "Iscriviti"
                    : "Iscriviti"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <h1 className="font-Montserrat font-bold flex lg:items-start items-center lg:justify-normal justify-center text-xl mb-3 mt-3">
        Corsi avanzati
      </h1>
      <div className="md:flex lg:flex-row justify-center lg:justify-normal space-x-3">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          advancedCourses.map((course) => (
            <div key={course.id} className="card-body p-3 mb-3">
              <img
                src={course.icon}
                alt="Foto corso"
                className="logo w-14 h-14"
              />
              <h3 className="font-bold">{course.title}</h3>
              <p className="text-xs mb-1">
                Livello difficoltà: {course.difficulty}
              </p>
              {user && (
                <button
                  className="button-CD p-[7px] text-sm"
                  onClick={() => handleButtonClick(course)}
                >
                  {user
                    ? course.isEnrolled
                      ? course.isCompleted
                        ? "Ripeti"
                        : "Riprendi"
                      : "Iscriviti"
                    : "Iscriviti"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
