import React from "react"
import { NavLink } from "react-router-dom"
import { signOut, getAuth } from "firebase/auth"
import { useNavigate} from "react-router-dom"

function Header(){
    const navigate = useNavigate();
    const auth = getAuth();

    async function logOut(){
        try{
            await signOut(auth)
            return navigate("/")
        } catch(err){
            console.error(err)
        }
    }

    const activeStyles = {
        color: "white",
        backgroundColor: "#d86628"
    }
    return(
        <>
            <header className="header">
            
            <img src="https://i.ibb.co/WDctnmH/logo.png" width="130px"/>
                <div className="mainPageNav">
                    <NavLink className = "navButtons" to="clockedhours" style={({ isActive }) => isActive ? activeStyles : null}> Clocked Hours</NavLink>
                    <NavLink className = "navButtons" to="changepassword" style={({ isActive }) => isActive ? activeStyles : null}> Change Password </NavLink>
                    <a className = "navButtons logOut" onClick = {logOut}>Log Out</a>
                </div>

            </header>
        </>
    )
}

export default Header