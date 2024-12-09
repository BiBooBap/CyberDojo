import React, { useEffect, useState } from "react";
import courseFacade from "../services/courseFacade";

const HomePage = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await courseFacade.getAllCourses(token); //CONTROLLA SE IL TOKEN È PRESENTE (corretto). Non controlla se l'username esiste come definito nel backend
        setCourses(data);
      } catch (error) {
        console.error("Errore nel recupero dei corsi:", error);
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  const handleButtonClick = (course) => {
    if (!user) {
      alert("È necessario registrarsi per iscriversi ai corsi.");
    } else {
      // Logica per iscriversi, riprendere o ripetere il corso
    }
  };

  return (
    <div>
      <h1 className="font-Montserrat justify-self-center font-bold text-xl mb-3 mt-3">
        Panoramica corsi
      </h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="card-body p-3">
            <img src={course.icon} alt="Foto corso" className="logo w-14 h-14" />
            <h3 className="font-bold">{course.title}</h3>
            <p className="text-xs mb-1">Livello difficoltà: {course.difficulty}</p>
            <button
              className="button-CD p-[7px]"
              onClick={() => handleButtonClick(course)}
              disabled={!user}
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
        ))
      )}
    </div>
  );
};

export default HomePage;
