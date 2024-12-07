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
import AdminTicketDashboard from "./admin/adminTicketDashboard.jsx";
import AdminTicketDetail from "./admin/adminTicketDetail.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Landing page */}
            <Route path="/SignUpPage" element={<SignUpPage />} />
            <Route path="/accessPage" element={<Accesso />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/negoziopunti" element={<NegozioPunti />} />
            <Route path="/areaUtente" element={<AreaUtente />} />
            <Route path="/quiz" element={<QuizApp />} />
            <Route path="/coursePage" element={<CoursePage />} />
            <Route path="/supportrequestpage" element={<SupportRequest />} />
            <Route path="/admin/adminTicketDashboard" element={<AdminTicketDashboard />} />
            <Route path="/admin/adminTicketDetail" element={<AdminTicketDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
