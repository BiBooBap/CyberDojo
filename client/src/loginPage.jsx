import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card-body py-8 px-6 bg-white rounded shadow-md">
        <h1 className="text-[#f7d1cd] font-bold text-2xl text-center mb-6">
          Login
        </h1>
        <form className="flex flex-col items-center">
          <div className="mb-4 w-72">
            <label className="block text-gray-700 font-bold mb-2">Username</label>
            <input
              type="text"
              className="rounded w-full h-10 px-3 border"
              placeholder="Username"
            />
          </div>
          <div className="mb-6 w-72 justify-center">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              className="rounded w-full h-10 px-3 border"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="bg-[#54295c] text-white py-2 px-8 rounded">
            Login
          </button>
          <div className="mt-4">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
