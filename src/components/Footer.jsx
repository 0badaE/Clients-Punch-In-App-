import React from "react"

function Footer(){
    return(
        <>
            
            <footer>
                <p><span>&#169;</span>{new Date().getFullYear()} Pouletto</p>
                <img src="/src/photos/logo.png" width="55px"/>
            </footer>
        </>
    )
}

export default Footer