import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Content goes here */}
      </main>
      <Footer />
    </div>
  </React.StrictMode>
);