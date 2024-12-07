import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Registrazione from "./registrazione.jsx";
import Login from "./login.jsx";
import HomePage from "./homePage.jsx";
import NegozioPunti from "./negozioPunti.jsx";
import AreaUtente from "./areaUtente.jsx";
import QuizApp from "./quiz.jsx";
import SupportRequest from "./supportRequestPage.jsx";
import AdminTicketDashboard from "./admin/adminTicketDashboard";
import AdminTicketDetail from "./admin/adminTicketDetail.jsx";
import PrivateRoute from "./utils/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/registrazione" element={<Registrazione />} />
            <Route path="/areautente" element={<AreaUtente />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/negoziopunti" element={<NegozioPunti />} />
            <Route path="/quiz" element={<QuizApp />} />
            <Route path="/supportrequestpage" element={<SupportRequest />} />
            <Route
              path="/admin/adminTicketDashboard"
              element={<AdminTicketDashboard />}
            />
            <Route
              path="/admin/adminTicketDetail"
              element={<AdminTicketDetail />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </React.StrictMode>
);
