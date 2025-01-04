import { createContext, useEffect, useState } from "react";


export const AuthContext=createContext();

export const AuthProvider=({children})=>{
   const [authenticated,setautheticated]=useState(false);
   const [user,setuser]=useState(null)
   
   useEffect(()=>{
     const token=localStorage.getItem('token');
     const usestr=localStorage.getItem('user')
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
    setautheticated(false);
    setuser(null);
   }

    return(
        <AuthContext.Provider value={{authenticated,user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}