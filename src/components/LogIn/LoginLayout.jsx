import React from "react"
import { Outlet } from "react-router-dom"


function LoginLayout(){
    
    return (   
        <div className = "page dark">
            <div className = "logo-placer">
                <img className = "placeholder-Logo" src="https://i.ibb.co/WDctnmH/logo.png"/>
            </div>
            <Outlet/>
        </div>
    )
}

export default LoginLayout