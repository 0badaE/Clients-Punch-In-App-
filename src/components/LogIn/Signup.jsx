import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { auth, googleProvider } from "../../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile  } from "firebase/auth"
import googleLogo from "../../photos/googleLogo.png"



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
                        
                    <img className = "google-Logo" src={googleLogo}/>Sign Up with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Signup