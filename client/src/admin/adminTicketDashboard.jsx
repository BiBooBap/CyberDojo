import React from "react";
import AdminSidebar from "./layout/adminSidebar";

function AdminTicketDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder Ticket Cards */}
          <div className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-red-400"></div>
            <div>
              <h3 className="text-lg font-semibold">Gianluca Vacchi</h3>
              <p>Problema con iscrizione ai corsi</p>
              <p className="text-sm mt-2">19/10/2024</p>
            </div>
          </div>
          <div className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-yellow-400"></div>
            <div>
              <h3 className="text-lg font-semibold">Mario Giallo</h3>
              <p>Come posso ri-seguire un corso?</p>
              <p className="text-sm mt-2">24/11/2024</p>
            </div>
          </div>
          <div className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-green-400"></div>
            <div>
              <h3 className="text-lg font-semibold">Anna Padova</h3>
              <p>Non riesco a comprare un bordo</p>
              <p className="text-sm mt-2">03/12/2024</p>
            </div>
          </div>
          <div className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-pink-400"></div>
            <div>
              <h3 className="text-lg font-semibold">Giovanna Prato</h3>
              <p>Problema cambio password</p>
              <p className="text-sm mt-2">19/01/2025</p>
            </div>
          </div>
          <div className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-yellow-400"></div>
            <div>
              <h3 className="text-lg font-semibold">Maria Genova</h3>
              <p>Non ricevo le notifiche</p>
              <p className="text-sm mt-2">22/01/2025</p>
            </div>
          </div>
          <div className="bg-[#54295c] text-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-teal-400"></div>
            <div>
              <h3 className="text-lg font-semibold">Christian Rosa</h3>
              <p>Aiuto relativo allo shop</p>
              <p className="text-sm mt-2">07/02/2025</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminTicketDashboard;
