import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../store";



const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()


    const handleSignup = async (e) => {
        e.preventDefault();

        let resp = await signup(name, email, password, dispatch)
        if (resp) {
            console.log("Registro exitoso")
            navigate('/private')
        } else {
            toast.error("No se pudo Registrar")
            return;
        }
    }

    return (

        <div className="container my-4">
            <h1 className="text-center">Register!</h1>
            <form onSubmit={handleSignup}>
                <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">Name</span>
                    <input type="text" className="form-control" placeholder="Your name" aria-label="name" aria-describedby="basic-addon1" onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                    <input type="text" className="form-control" placeholder="youremail@gmail.com" aria-label="email" aria-describedby="basic-addon1" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                    <input type="text" className="form-control" placeholder="*****" aria-label="password" aria-describedby="basic-addon1" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary w-100">SignUp!</button>
            </form>
        </div>
    )
}

export default Signup;