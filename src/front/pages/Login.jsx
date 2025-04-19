import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { store, dispatch } = useGlobalReducer()

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let response = await fetch(
              "https://friendly-potato-6prwv6g4jg9hx455-3001.app.github.dev/api/login",
              {
                method: "POST",
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            );
  
            if (!response.ok ) {
              console.error("Error trying to login, pelase try again.");
              toast.error("Email and/or password invalid!")
              throw new Error(response.statusText);
            }
  
            const data = await response.json();
  
            if (!data.access_token) {
              console.error(data, "No valid token received!")
              toast.error("There is not a valid token!")
              throw new Error("No token received");
              
            }
  
            localStorage.setItem("token", data.access_token);
            console.log("Token guardado en localStorage:", data.access_token);
            dispatch({type: "logged_in", payload: data.email})
            toast.success("Successfully logged in!")
            navigate("/private")
  
          } catch (error) {
            console.error(error);
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