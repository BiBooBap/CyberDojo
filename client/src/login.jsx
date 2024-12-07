import React from "react";

const handleSubmit = async (event) => {
  event.preventDefault();

  if (response.ok) {
    const data = await response.json();
    const token = data.token;

    localStorage.setItem("token", token);

    window.location.href = "/areautente";
  } else {
    alert("Login failed");
  }
};

const Login = () => {
  return (
    <div className="card-body mt-6 py-4 px-6">
      <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
        Login
      </h1>
      <p className="mb-1 text-white font-bold text-sm">Username</p>
      <input
        type="text"
        className="rounded-2xl w-72 h-8 mb-2 pl-2 login-input"
        placeholder="Username"
      />
      <p className="mb-1 text-white font-bold text-sm">Password</p>
      <input
        type="password"
        className="rounded-2xl w-72 h-8 mb-4 pl-2 login-input"
        placeholder="Password"
      />
      <br />
      <button type="submit" className="button-CD py-2 px-8 mt-3 ml-3 text-xl">
        Login
      </button>
      <div className="login-footer mt-4 text-center text-white just">
        <a href="/forgot-password" className="text-white hover:underline">
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default Login;

