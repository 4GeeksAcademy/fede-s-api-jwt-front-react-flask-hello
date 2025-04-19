import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    

    const handleSignup = async (e) => {
        e.preventDefault();  

        try {
            const response = await fetch("https://friendly-potato-6prwv6g4jg9hx455-3001.app.github.dev/api/signup", {
                method: "POST",
                body: JSON.stringify({'name': name, 'email': email, 'password': password}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
            });

            if(!response.ok){
                console.error(`There was a error from the server: ${response.statusText}`);
                toast.error("Ther was an error from the server")
                return false
            }

            const data = await response.json();
            dispatch({type: 'signup', payload: data.user})

            if (data.access_token) {
                localStorage.setItem("token", data.access_token)
            }
            toast.success("Successuffully registered!")
            navigate('/private')

        } catch (error) {
            console.error(`There was an error, Fetch couldn't be done: ${error}`)
            toast.error("Ther was an error from the server")

        }
    }

    return (

        <div className="container my-4">
            <h1 className="text-center">Register!</h1>
            <form onSubmit={handleSignup}>
                <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">Name</span>
                    <input type="text" className="form-control" placeholder="Your name" aria-label="name" aria-describedby="basic-addon1" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                    <input type="text" className="form-control" placeholder="youremail@gmail.com" aria-label="email" aria-describedby="basic-addon1" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                    <input type="text" className="form-control" placeholder="*****" aria-label="password" aria-describedby="basic-addon1" onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <button type="submit" className="btn btn-primary w-100">SignUp!</button>
            </form>
        </div>
    )
}

export default Signup;