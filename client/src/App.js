// Import necessary components and utilities
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import SignUpPage from "./signUpPage.jsx";
import Accesso from "./accessPage.jsx";
import Login from "./loginPage.jsx";
import HomePage from "./visitor/homePage.jsx";
import NegozioPunti from "./user/shop.jsx";
import AreaUtente from "./user/userPage.jsx";
import QuizPage from "./user/quiz.jsx";
import CoursePage from "./visitor/coursePage.jsx";
import SupportRequest from "./user/supportRequestPage.jsx";
import AdminRoutes from "./admin/AdminRoutes.jsx";
import VisitorRoute from "./utils/VisitorRoute.js";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import { getUserRole, getPayload } from "./utils/auth";
import NotAdminRoute from "./utils/NotAdminRoute.js";
import SupportVisitorPage from "./visitor/supportVisitorPage.jsx";
import Privacy from "./privacy.jsx";
import TerminiECondizioni from "./termAndCondition.jsx";

// Retrieve the user's role and payload from authentication utilities
function App() {
  const userRole = getUserRole();
  const currentUser = getPayload();


  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route
              path="/homepage"
              element={
                <NotAdminRoute>
                  <HomePage user={currentUser} />
                </NotAdminRoute>
              }
            />

            <Route
              path="/privacy"
              element={
                <NotAdminRoute>
                  <Privacy />
                </NotAdminRoute>
              }
            />

            <Route
              path="/supporto"
              element={
                <VisitorRoute>
                  <SupportVisitorPage />
                </VisitorRoute>
              }
            />

            <Route
              path="/termAndCondition"
              element={
                <NotAdminRoute>
                  <TerminiECondizioni />
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
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:courseId"
              element={
                <ProtectedRoute requiredRole="user">
                  <QuizPage />
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
