import React from "react";
import AdminSidebar from "./layout/adminSidebar";

function AdminTicketDetail() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Vorrei rifare il corso</h1>
          <p className="text-lg mb-2">Username: Barbascura X</p>
          <p className="text-lg mb-6">
            Vorrei poter rifare il corso di sicurezza informatica poiché non sono soddisfatto del risultato ottenuto
          </p>
          <textarea
            className="w-full p-4 mb-4 rounded-lg bg-gray-100 text-gray-700"
            placeholder="Scrivi una risposta"
            rows="5"
          ></textarea>
          <div className="flex space-x-4">
            <button className="bg-[#54295c] text-white px-6 py-2 rounded-lg">Chiudi ticket</button>
            <button className="bg-[#54295c] text-white px-6 py-2 rounded-lg">Invia risposta</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminTicketDetail;