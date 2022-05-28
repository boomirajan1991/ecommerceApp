import React from 'react'
import { useNavigate } from "react-router-dom";
const Logout = () => {
    let navigate = useNavigate();
    localStorage.clear()
    navigate('../login')
    return (
        <div>
        </div>
    )
}

export default Logout
