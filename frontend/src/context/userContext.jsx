import {  createContext, useEffect,useState } from "react";

export const userContext = createContext();

// create a provider

const UserProvider = ({children})=> {
    // our state from which we willl get the value to pass to our provider

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    // JSON.parse(localStorage.getItem('user') As the user login sucessfully , we will have the user token saved to local storage os we use this to 
    // get the value

// We are suing useEffect to store the user token to local storage if the currentUser (token) changes
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return <userContext.Provider value={{currentUser, setCurrentUser}}>{children}</userContext.Provider>
}

export default UserProvider