import Link from 'next/link';
import React from 'react'
import toBack from '../../../ultils/toBack';

type FooterButton = {
    onClick?:( e: React.MouseEvent<HTMLButtonElement>)=>void, //passa um evento de mouse
    href?: string,
    type?: 'submit' | 'button' | 'reset';
    value: string;
    disabled?: boolean;
    className?: string;
}

type FooterProps = {
    buttons: FooterButton[];
}

export const BackButton: FooterButton = {
    value: 'Voltar',
    type: 'button',
    onClick: () => toBack(),
}


export const ContinueButton: FooterButton = {
    value: 'Continuar',
    type: 'submit',
}


export const Footer = ({buttons = [BackButton, ContinueButton]}: FooterProps) => {
  return (
    <footer className='fixed'>
        {buttons.map(({onClick, href, type, value, disabled, className}, index)=>{
            if(href === undefined) {
                return (
                    <button
                        key={index}
                        type={type}
                        onClick={onClick}
                        className={className}
                        disabled={disabled !== undefined ? disabled : false}
                    >{value}</button>
                )
            } else {
                return(
                    <Link href={href} key={index}>
                        <a className={className}>{value}</a>
                    </Link>
                )
            }
        })}
    </footer>
  )
}

export default Footer;
