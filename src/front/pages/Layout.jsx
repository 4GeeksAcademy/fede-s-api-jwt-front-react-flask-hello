import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ToastContainer } from "react-toastify";


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000}/>
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}