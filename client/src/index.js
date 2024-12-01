import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Registrazione from "./registrazione.jsx";
import Login from "./login.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Registrazione />
        <Login />
      </main>
      <Footer />
    </div>
  </React.StrictMode>
);
