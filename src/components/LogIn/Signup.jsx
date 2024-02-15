import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { auth, googleProvider } from "../../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile  } from "firebase/auth"


function Signup(props){
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [passwordsDontMatch, setPasswordsDontMatch] = React.useState(false)
    
    

    async function signUp(){
        try{
            if(password === confirmPassword) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user;
                await updateProfile(user, {displayName: name});
                return navigate("/main")
            } else {
                setPasswordsDontMatch(true)
            }
        } catch(err){
            console.error(err)
        }
    }
    
    async function signUpWithGoogle(){
        try{
            await signInWithPopup(auth, googleProvider)
            return navigate("/main")
        } catch(err){
            console.error(err)
        }
    }

    return (
        <div className="login-page">    
            <div className = "page dark">
                <div className="login-page">
                    <Link className="backButton forgotpass" to="/"> &larr; Sign In</Link>

                    <input className = "loginInfo" type="email" placeholder="Email" onChange = {(e)=> setEmail(e.target.value)}/>

                    <input className = "loginInfo" type="email" placeholder="Name" onChange = {(e)=> setName(e.target.value)}/>

                    <input className = "loginInfo" type="password" placeholder="Password" onChange = {(e)=> setPassword(e.target.value)}/>

                    <input className = "loginInfo" type="password" placeholder="Confirm Password" onChange = {(e)=> setConfirmPassword(e.target.value)}/>

                    <p style={{color: "rgb(201 50 50)"}}> {passwordsDontMatch ? "Passwords do not Match" : ""} </p>

                    <button onClick = {signUp}>Sign Up</button>

                    <button onClick = {signUpWithGoogle} className="google-login-btn">
                        
                    <img className = "google-Logo" src="https://png2.cleanpng.com/sh/4e05052fc2fd3c145566129da3067597/L0KzQYm3VMI0N6V7fZH0aYP2gLBuTfdwd5hxfZ91b3fyPb32hB8udJDsh58AYXToR7XqV8g1bWNmSJC9MEa7R4G3WME2OmU6S6IBM0G4RIW6TwBvbz==/kisspng-google-logo-logo-logo-5ade7dc784e2a0.4068700815245306315443.png"/>Sign Up with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Signup