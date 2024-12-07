import React from "react";


function CoursePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-8 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Course Title Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img src="/img/course-icon.png" alt="Course Icon" className="w-32 h-32" />
              <h1 className="text-4xl font-bold">Progettazione Algoritmi</h1>
            </div>
            <div className="text-2xl font-semibold text-purple-600">Le 5 fasi del lutto</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: "60%" }}></div>
          </div>

          {/* Final Quiz Button */}
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-lg mb-8 flex items-center space-x-2">
            <span className="font-bold">Quiz Finale</span>
            <span role="img" aria-label="lock icon">🔒</span>
          </button>

          {/* Topics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Topic 1 */}
            <div className="bg-yellow-400 p-6 rounded-lg shadow-md flex items-start space-x-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Argomento 1</h2>
                <p className="text-lg">Interval scheduling e Partizionamento di intervalli</p>
                <p className="text-md text-gray-800">Problema del taglio del tubo</p>
              </div>
              <div className="ml-auto">
                <span className="text-green-500 font-bold text-xl">✔️</span>
              </div>
            </div>

            {/* Topic 2 */}
            <div className="bg-yellow-400 p-6 rounded-lg shadow-md flex items-start space-x-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Argomento 2</h2>
                <p className="text-lg">Algoritmo Dijkstra</p>
                <p className="text-md text-gray-800">Algoritmo di Prim<br />Algoritmo di Kruskal</p>
              </div>
              <div className="ml-auto">
                <span className="text-gray-500 font-bold text-xl">⏳</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoursePage;
