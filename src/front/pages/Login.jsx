import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { store, dispatch } = useGlobalReducer()

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    let resp = await login(email, password, dispatch)
    if (resp) {
      console.log("Login exitoso")
      navigate('/private')
    } else {
      toast.error("No se pudo ingresar")
      return;
    }

  };

  return (
    <div className="container mt-5">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;