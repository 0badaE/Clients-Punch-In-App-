import React from "react"
import { useOutletContext } from "react-router-dom" 
import { getAuth } from "firebase/auth"
import { 
addDoc,
collection, 
Timestamp 
} from "firebase/firestore"
import { db } from "../config/firebase"
import timeConverter from "./functions/timeConverter"


function HomePage(){
    const auth = getAuth();
    const timesCollection = collection(db, "time stamps")
    const [clock,setClock] = React.useState(new Date())
    const context = useOutletContext()


    React.useEffect(()=>{
        setInterval(()=>setClock(new Date()),1000)
    },[])

    async function onSubmitTime(type){
        try{
            await addDoc(timesCollection,{
                name: auth.currentUser.displayName,
                time: Timestamp.now(),
                type: type,
                id: auth.currentUser.uid
            })
        } catch(err){
            console.error(err)
        }
    }

    const displayTimes = context.slice(0,4).map((item,index)=> 
        <div className="timeCell" key={index}> 
            <p className="cell">{item.type} </p>
            <p className="cell">{timeConverter(item.time.nanoseconds, item.time.seconds).split(" ").slice(4, 6).join(" ")}</p>
            <p className="cell">{timeConverter(item.time.nanoseconds, item.time.seconds).split(" ").slice(0,3).join(" ")}</p>
        </div>
    )

    return(
        <>
        <div className = "home-page">
            <div className = "home-top">
                <h1 className="homeText">Hello {auth.currentUser.displayName || "there"},</h1>
                <h2 className="homeText">{clock.toLocaleTimeString()}</h2>
            </div>
            <div className="home-main"> 
                <button onClick={()=>onSubmitTime("Punch In")}className="punchButtons">Punch In</button>
                <button onClick={()=>onSubmitTime("Break")}className="punchButtons break">Break</button>
                <button onClick={()=>onSubmitTime("End Break")}className="punchButtons break">End Break</button>
                <button onClick={()=>onSubmitTime("Punch Out")}className="punchButtons punchOut">Punch Out</button>
            </div>
            <div>
                <h3 className="homeText">Most Recent Entries</h3>
                {displayTimes}
            </div>
        </div>

        </>
    )
}

export default HomePage