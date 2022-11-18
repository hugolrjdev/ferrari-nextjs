import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type MenuContextType = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void;
}// tipo do contexto

const MenuContext = createContext<MenuContextType>({
    isOpen: false,
    setIsOpen: () => {},
});

type MenuProviderType = {
    children: ReactNode,
}

export const MenuProvider = ({children}: MenuProviderType) => {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        if(isOpen){
            document.body.classList.add('open-menu');
        }else {
            document.body.classList.remove('open-menu');
        }
    }, [isOpen]); // se o array ficar vazio o useEffect funcionara somente quando o Componente Header for montados

    return <MenuContext.Provider value={{isOpen, setIsOpen}}>{children}</MenuContext.Provider>//se você não passar um objeto ele não funcionará

}


export function useMenu() {
    const context = useContext(MenuContext);
    if(!context) {
        throw new Error('useMenu must be used within a MenuProvider')
    }
    return context;
}
