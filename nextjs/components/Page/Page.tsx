import { timeLog } from 'console';
import React, { ReactNode } from 'react'

export type PageColor = 'blue' | 'green' | 'yellow' | 'red';

type PageProps = {
    title: string | ReactNode;
    pageColor?: PageColor;
    children?: ReactNode;
    panel?: ReactNode;
    id: string;
}

export default function Page({title, pageColor, children, panel, id}: PageProps) {
  return (
    <section className={[pageColor, 'page', panel? 'width-panel': ''].join(' ')} id={id}>
        <header>
            <h1>{title}</h1>
        </header>
        <main>
            {children}
        </main>
        {panel && <aside>{panel}</aside>}
    </section>
  )
}
