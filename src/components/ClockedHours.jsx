import React from "react"
import { Link, useOutletContext } from "react-router-dom"
import  timeConverter  from "./functions/timeConverter"

function ClockedHours(){
    
    const context = useOutletContext()
    
    const displayTimes = context.slice(0,40).map((item,index)=> 
        <div className="timeCell" key={index}> 
            <p className="cell">{item.type} </p>
            <p className="cell">{timeConverter(item.time.nanoseconds, item.time.seconds).split(" ").slice(4, 6).join(" ")}</p>
            <p className="cell">{timeConverter(item.time.nanoseconds, item.time.seconds).split(" ").slice(0,3).join(" ")}</p>
        </div>
    )

        
    return(
        <>
        <div className = "clockedHours">
            <Link className="backButton" to="/main"> &larr; Home</Link>
            <div className= "titles">
                <h4 className="title cell">Clocked</h4>
                <h4 className="title cell">Time</h4>
                <h4 className="title cell">Date</h4>
            </div>
            {displayTimes}
        </div>
        </>
    )
}

export default ClockedHours