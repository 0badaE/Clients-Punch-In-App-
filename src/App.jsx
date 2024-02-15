import React from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import LoginLayout from "./components/LogIn/LoginLayout"
import Login, {loader as loginLoader} from "./components/LogIn/Login"
import ForgotPassword from "./components/LogIn/ForgotPassword"
import Signup from "./components/LogIn/Signup"
import Layout from "./components/Layout"
import HomePage from "./components/HomePage"
import ClockedHours from "./components/ClockedHours"
import ChangePassword from "./components/ChangePassword"
import AuthContext from "./components/Context/AuthContext"
import Protected from "./components/LogIn/Protected"

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<Login/>} loader={loginLoader}/>
          <Route path="signup" element={<Signup/>} />
          <Route path="forgotpassword" element={<ForgotPassword/>} />
        </Route>

      <Route path="/main" element={<Protected> <Layout/> </Protected>}>
        <Route index element = {<HomePage/>}/>
        <Route path="clockedhours" element = {<ClockedHours/>}/>
        <Route path="ChangePassword" element = {<ChangePassword/>}/>
      </Route>
    </>
  ))

  return (
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  )
}

export default App