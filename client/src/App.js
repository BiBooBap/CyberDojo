import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import SignUpPage from "./signUpPage.jsx";
import Accesso from "./accessPage.jsx";
import Login from "./loginPage.jsx";
import HomePage from "./visitor/homePage.jsx";
import NegozioPunti from "./user/shop.jsx";
import AreaUtente from "./user/userPage.jsx";
import QuizApp from "./user/quiz.jsx";
import CoursePage from "./visitor/coursePage.jsx";
import SupportRequest from "./user/supportRequestPage.jsx";
import AdminRoutes from "./admin/AdminRoutes.jsx";
import VisitorRoute from "./utils/VisitorRoute.js";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import { getUserRole } from "./utils/auth";
import NotAdminRoute from "./utils/NotAdminRoute.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const userRole = getUserRole();

  useEffect(() => {
    // Recupera il token dal localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decodifica il payload del token
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUser(payload);
      } catch (error) {
        console.error("Errore nel parsing del token:", error);
      }
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage user={currentUser} />} />
            <Route
              path="/homepage"
              element={
                <NotAdminRoute>
                  <HomePage user={currentUser} />
                </NotAdminRoute>
              }
            />
            {/* ^ Landing page ^ */}
            <Route
              path="/SignUpPage"
              element={
                <VisitorRoute>
                  <SignUpPage />
                </VisitorRoute>
              }
            />
            <Route
              path="/accessPage"
              element={
                <VisitorRoute>
                  <Accesso />
                </VisitorRoute>
              }
            />
            <Route
              path="/loginpage"
              element={
                <VisitorRoute>
                  <Login />
                </VisitorRoute>
              }
            />

            <Route
              path="/negoziopunti"
              element={
                <ProtectedRoute requiredRole="user">
                  <NegozioPunti />
                </ProtectedRoute>
              }
            />
            <Route
              path="/areaUtente"
              element={
                <ProtectedRoute requiredRole="user">
                  <AreaUtente user={currentUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute requiredRole="user">
                  <QuizApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coursePage"
              element={
                <NotAdminRoute>
                  <CoursePage />
                </NotAdminRoute>
              }
            />
            <Route
              path="/supportrequestpage"
              element={
                <NotAdminRoute>
                  <SupportRequest />
                </NotAdminRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminRoutes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {userRole !== "admin" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
