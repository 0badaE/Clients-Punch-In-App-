import React from "react"
import { Link, useNavigate  } from "react-router-dom"
import { getAuth, updatePassword  } from "firebase/auth";

function ChangePassword(){
    const auth = getAuth();
    const navigate = useNavigate();
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [passwordsDontMatch, setPasswordsDontMatch] = React.useState(false)
    const [passwordsMatch, setPasswordsMatch] = React.useState(false)

    async function passwordConfirm(){
        if (password !== confirmPassword){
            setPasswordsDontMatch(true)
            setPasswordsMatch(false)
        } else {
            try{
                await updatePassword(auth.currentUser, confirmPassword)
                .then(setPasswordsMatch(true))
                .then(setPasswordsDontMatch(false))
                .then(setTimeout(function(){
                    navigate("/main")
                }, 1000))
            }catch(error) {
                console.error(error)
              };
        }
    }

    return(
        <div className="changePasswordPage">
            <Link className="backButton" to="/main"> &larr; Home</Link>
            <div className="changePassword">
                <input className = "passwordChangeInput" onChange = {(e)=> setPassword(e.target.value)} type="password" placeholder="New Password" />
                <input className = "passwordChangeInput" onChange = {(e)=> setConfirmPassword(e.target.value)}type="password" placeholder="Confirm New Password" />
                <p style={{color: "rgb(201 50 50)"}}> {passwordsDontMatch ? "Passwords do not Match" : ""} </p>
                <p style={{color: "rgb(102 183 104)"}}> {passwordsMatch ? "Password Updated Succesfully" : ""} </p>
                <button className = "passwordButton" onClick = {passwordConfirm}>Change Password</button>
            </div>
        </div>
    )
}

export default ChangePassword