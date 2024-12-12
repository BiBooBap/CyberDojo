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
      <h1 className="font-Montserrat font-bold text-center text-xl mb-6 mt-6">
        Panoramica corsi
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="card-body p-6 mb-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center w-80">
              <img
                src={course.icon}
                alt="Foto corso"
                className="logo w-14 h-14"
              />
              <h3 className="font-bold text-lg text-center mb-2">{course.title}</h3>
              <p className="text-xs mb-4 text-center">
                Livello difficoltà: {course.difficulty}
              </p>
              {user && (
                <button
                  className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
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
      <h1 className="font-Montserrat font-bold text-center text-xl mb-6 mt-6">
        Corsi introduttivi
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          introductionCourses.map((course) => (
            <div key={course.id} 
            className= "card-body p-6 mb-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center w-80">
              <img
                src={course.icon}
                alt="Foto corso"
                className="logo w-14 h-14"
              />
              <h3 className="font-bold text-lg text-center mb-2">{course.title}</h3>
              <p className="text-xs mb-4 text-center">
                Livello difficoltà: {course.difficulty}
              </p>
              {user && (
                <button
                  className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
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
      <h1 className="font-Montserrat font-bold text-center text-xl mb-6 mt-6">
        Corsi intermedi
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          intermediateCourses.map((course) => (
            <div key={course.id} 
            className="card-body p-6 mb-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center w-80">
              <img
                src={course.icon}
                alt="Foto corso"
                className="logo w-14 h-14"
              />
              <h3 className="font-bold text-lg text-center mb-2">{course.title}</h3>
              <p className="text-xs mb-4 text-center">
                Livello difficoltà: {course.difficulty}
              </p>
              {user && (
                <button
                  className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
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
      <h1 className="font-Montserrat font-bold text-center text-xl mb-6 mt-6">
        Corsi avanzati
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          advancedCourses.map((course) => (
            <div key={course.id} 
            className="card-body p-6 mb-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center w-80">
              <img
                src={course.icon}
                alt="Foto corso"
                className="logo w-14 h-14"
              />
              <h3 className="font-bold text-lg text-center mb-2">{course.title}</h3>
              <p className="text-xs mb-4 text-center">
                Livello difficoltà: {course.difficulty}
              </p>
              {user && (
                <button
                  className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
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
