import React from "react";
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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homepage" element={<HomePage />} />
            {/* ^ Landing page ^ */}
            <Route
              path="/registrazione"
              element={
                <VisitorRoute>
                  <SignUpPage />
                </VisitorRoute>
              }
            />
            <Route
              path="/accesso"
              element={
                <VisitorRoute>
                  <Accesso />
                </VisitorRoute>
              }
            />
            <Route
              path="/login"
              element={
                <VisitorRoute>
                  <Login />
                </VisitorRoute>
              }
            />

            <Route
              path="/negozio"
              element={
                <ProtectedRoute requiredRole="user">
                  <NegozioPunti />
                </ProtectedRoute>
              }
            />
            <Route
              path="/areautente"
              element={
                <ProtectedRoute requiredRole="user">
                  <AreaUtente />
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
            <Route path="/coursepage" element={<CoursePage />} />
            <Route path="/supportrequestpage" element={<SupportRequest />} />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
