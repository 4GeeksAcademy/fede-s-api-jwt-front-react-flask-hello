import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../store";



const Private = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const access_token = localStorage.getItem("token")

        if (!access_token) {
            navigate("/login")
        }


        getUsers(dispatch);

    }, [])

    return (
        <div className="container my-4">
            <ul className="list-group list-group">
                {store.users.reverse().map((user, index) => (
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