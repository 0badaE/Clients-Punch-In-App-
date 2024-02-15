import React, { createContext } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const Context = createContext()

function AuthContext({children}){
    const auth = getAuth()
    const [user,setUser] = React.useState(null);
    const [loading, SetLoading] = React.useState(true);

    React.useEffect(()=>{
        let unsubscribe 
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            SetLoading(false)
            if(currentUser){
                setUser(currentUser)
            } else {
                setUser(null)
            }
        })
        return () => {
            if(unsubscribe){
                unsubscribe()
            }
        }
    },[])
    const value = {
        user: user,
        setUser: setUser,
    }
    return <Context.Provider value = {value}>
        {!loading && children}
    </Context.Provider> 
}

export default AuthContext