import { useContext } from "react";
import { AuthContext } from "..";

export function useAuth () {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('você esta usando useAuth fora do contexto')
    }
    return context;
}