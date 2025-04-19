import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";


const Private = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const access_token = localStorage.getItem("token");

        if (!access_token) {
            navigate("/login")
        }

        const get_users = async () => {
            try {
                let response = await fetch('https://friendly-potato-6prwv6g4jg9hx455-3001.app.github.dev/api/private', {

                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    }

                })

                if (!response.ok) {
                    console.log("The error code is: ", response.statusText)
                    throw new Error("There was an error trying to get the users.");
                }

                const data = await response.json()
                dispatch({ type: "get_users", payload: data.users })
                setUsers(data.users)
                console.log(users)


            } catch (error) {
                console.log("This is the catch")
                console.error(error)
            }
        }

        get_users();

    }, [])

    return (
        <div className="container my-4">
            <ul className="list-group list-group">
                {[...users].reverse().map((user, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold"> User number: {user.id}</div>
                            {user.email}
                        </div>
                        <span className={`badge ${user.is_active ? 'bg-success' : 'bg-danger'} rounded-pill`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                    </li>
                ))}

            </ul>
        </div>

    )
}

export default Private;