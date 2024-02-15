import React from "react"
import { useNavigate , Link, useLoaderData } from "react-router-dom"
import { auth, googleProvider } from "../../config/firebase"
import { signInWithEmailAndPassword , signInWithPopup } from "firebase/auth"



export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}


function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [err,setErr] = React.useState()
    const message = useLoaderData()

    
    async function signIn(){
        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/main");
        } catch(err){
            console.error(err)
            setErr("Cannot Sign In - Check Credentials")
        }
    }
    async function signInWithGoogle(){
        try{
            await signInWithPopup(auth, googleProvider)
            navigate("/main");
        } catch(err){
            console.error(err)
            setErr("Cannot Sign In - Try again")
        }
    }
    
    return(
        <div className="login-page">
            <input className = "loginInfo" type="email" placeholder="Email" onChange = {(e)=> setEmail(e.target.value)}/>
            <input className = "loginInfo" type="password" placeholder="Password" onChange = {(e)=> setPassword(e.target.value)}/>
           
            {message && <p style={{color: "rgb(201 50 50)"}}>{message}</p> || <p style={{color: "rgb(201 50 50)"}}>{err ? err : ""}</p>}
            <button onClick = {signIn}>Login</button>
            <button  onClick = {signInWithGoogle} className="google-login-btn">
            <img className = "google-Logo" src="https://png2.cleanpng.com/sh/4e05052fc2fd3c145566129da3067597/L0KzQYm3VMI0N6V7fZH0aYP2gLBuTfdwd5hxfZ91b3fyPb32hB8udJDsh58AYXToR7XqV8g1bWNmSJC9MEa7R4G3WME2OmU6S6IBM0G4RIW6TwBvbz==/kisspng-google-logo-logo-logo-5ade7dc784e2a0.4068700815245306315443.png"/>Login with Google</button>
            <p className = "darkText">Forgot Password? <Link to= "forgotpassword">Click Here</Link></p>
            <p className = "darkText">No account? <Link to= "signup">Sign Up</Link></p>
        </div>
    )
}

export default Login