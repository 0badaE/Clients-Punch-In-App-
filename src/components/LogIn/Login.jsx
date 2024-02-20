import React from "react"
import { useNavigate , Link, useLoaderData } from "react-router-dom"
import { auth, googleProvider } from "../../config/firebase"
import { signInWithEmailAndPassword , signInWithPopup } from "firebase/auth"
import googleLogo from "../../photos/googleLogo.png"



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
            <img className = "google-Logo" src={googleLogo}/>Login with Google</button>
            <p className = "darkText">Forgot Password? <Link to= "forgotpassword">Click Here</Link></p>
            <p className = "darkText">No account? <Link to= "signup">Sign Up</Link></p>
        </div>
    )
}

export default Login
