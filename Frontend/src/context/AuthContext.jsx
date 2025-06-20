import { createContext, useEffect, useState } from "react";


export const AuthContext=createContext();

export const AuthProvider=({children})=>{
   const [authenticated,setautheticated]=useState(false);
   const [user,setuser]=useState(null)
   const [dark,setDark]=useState(false);
   
   useEffect(()=>{
    const mode=localStorage.getItem("mode");
     const token=localStorage.getItem('token');
     const usestr=localStorage.getItem('user')
     if(mode){
        setDark(JSON.parse(mode));
     }
     if(token){
        setautheticated(true);
     }
     if(usestr){
        setuser(JSON.parse(usestr))
     }

   },[])

   const login=(credentials)=>{
    setautheticated(true);
    setuser(credentials)
   }
   const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setautheticated(false);
    setuser(null);
   }
   const modeChange=()=>{
    localStorage.setItem("mode",`${!dark}`)
    setDark(!dark);
   }
    return(
        <AuthContext.Provider value={{authenticated,user,dark,login,logout,modeChange}}>
            {children}
        </AuthContext.Provider>
    )
}