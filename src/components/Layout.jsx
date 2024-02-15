import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { getAuth } from "firebase/auth"
import { 
collection, 
getDocs,
query, 
where, 
orderBy,
onSnapshot
} from "firebase/firestore"
import { db } from "../config/firebase"


export default function Layout() {
    const auth = getAuth();
    const timesCollection = collection(db, "time stamps")
    const [times, setTimes] = React.useState([])

    React.useEffect(() => {
        const q = query(
            timesCollection,
            where("id", "==", auth.currentUser.uid),
            orderBy("time", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setTimes(newData.reverse());
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);
   
    return (
        <div className="container">
            <Header />
            <main>
                <Outlet context={times}/>
            </main>
            <Footer />
        </div>
    )
}