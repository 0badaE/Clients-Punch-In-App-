import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword(props) {
  const [email, setEmail] = React.useState("")
  const [sent, setSent] = React.useState(null)
  const [failed, setFailed] = React.useState(false)
  const auth = getAuth();
  const navigate = useNavigate();

  async function sendResetEmail() {
    await sendPasswordResetEmail(auth, email)
      .then(setSent(true))
      .then(setTimeout(function () {
        navigate("/")
      }, 1000))
      .catch((error) => {
        console.error(error)
        setFailed(true)
      });
  }
  return (
    <div className="login-page">
      <Link className="backButton forgotpass" to="/"> &larr; Sign In</Link>
      <input className="loginInfo" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <p style={{ color: "rgb(102 183 104)" }}>{sent ? "Password Reset Email Sent" : ""}</p>
      <p style={{ color: "rgb(201 50 50)" }}>{failed ? "Please Try Again" : ""}</p>
      <button onClick={sendResetEmail}>Reset Password</button>
    </div>
  )
}

export default ForgotPassword