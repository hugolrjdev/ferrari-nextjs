import { ReactNode, useEffect, useState } from "react";

type ToastProps={
    type?: 'success' | 'danger';
    open?: boolean;
    onClose?: Function;
    children: ReactNode;
}

const Toast: React.FC<ToastProps> = ({children, type = 'success', open= true, onClose}: ToastProps) => {

    const [opened, setOpened] = useState(open);
    const close = () => {
        if(typeof onClose === 'function'){
            onClose();
        }
        setOpened(false);
    }

    useEffect(()=>setOpened(open), [open])
    return(
    <div className={['toast', opened ? 'open' : '', type].join(' ')}>
        {children}
        <button type="button" className="close" onClick={()=> close()}></button>
        <span>x</span>
    </div>)

}


export default Toast;