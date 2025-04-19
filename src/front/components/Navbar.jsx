import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Navbar = () => {

	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const navigate = useNavigate()


	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false)
		toast.info("You have logged out successfully, see you!")
		navigate('/')
	}

	useEffect(()=>{
		setIsLoggedIn(!!localStorage.getItem("token"))
	},[])

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary mx-2">Check the Context in action</button>
					</Link>
					<Link to="/signup">
					{localStorage.getItem("token") ? '' : <button className="btn btn-primary mx-2">Signup</button>}
					</Link>
					<Link to="/login">
						{localStorage.getItem("token")? <button onClick={handleLogout} className="btn btn-danger mx-2">Logout</button> : <Link to={'/login'} className="btn btn-success mx-2">Login</Link>}
						
					</Link>
				</div>
			</div>
		</nav>
	);
};