import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect,useState, useContext, createContext} from "react";
const AuthContext=createContext();
const AuthLoadingContext=createContext();
 export function AuthProvider({children}){
    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{ 
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    },[]);
    return (
        <AuthContext.Provider value={user}>
            <AuthLoadingContext.Provider value={loading}>
                {children}
            </AuthLoadingContext.Provider>
        </AuthContext.Provider>
    );
 }

 export function useAuth(){
    return useContext(AuthContext);
 }
 export function useAuthLoading(){
    return useContext(AuthLoadingContext);
 }