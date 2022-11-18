import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import axios from 'axios';
import { Schedule } from '../types/Schedule';
import { useState } from 'react';
import { dateStringToDate } from '../ultils/dateStringToDate';
import redirectToAuth from '../ultils/redirectToAuth';
import withAuthentication from '../ultils/withAuthentication';
import Head from '../components/Head';
import Header from '../components/home/Header';
import Page from '../components/Page';
import Title from '../components/Page/Title';
import ServiceItem from '../components/ServiceItem';
import Footer from '../components/Page/Footer';

type ComponentPageProps = {
    schedules: Schedule[],
    token:string
}

const ComponentPage: NextPage<ComponentPageProps> = ({schedules, token}) => {
    const [nextSchedules, setNextSchedules] = useState<Schedule[]>(
        schedules.filter(
            (schedule) => dateStringToDate(schedule.scheduleAt).getTime() > new Date().getTime()
        )
    );

    const [historySchedules, setHistoryNextSchedules] = useState<Schedule[]>(
        schedules.filter(
            (schedule) => dateStringToDate(schedule.scheduleAt).getTime() <= new Date().getTime()
        )
    );
    return (
        <>
        <Head />
        <Header />
        <Page title="Agendamentos" id="schedules">
            <Title value="Próximos" />
            <ul>
                {nextSchedules.length === 0 && <li>Nenhum agendamento encontrado</li>}
                {nextSchedules.map((schedule)=>(
                    <ServiceItem
                        key={schedule.id.toString()}
                        data={schedule}
                        token={token}
                        onCanceled={(data) => setNextSchedules((items) => items.filter((i) => i.id !== data.id))}
                     />
                ))}
            </ul>
            <Title value="Histórico" />
            <ul>
                {historySchedules.length === 0 && <li>Nenhum histórico de agendamento</li>}
                {historySchedules.map((schedule)=>(
                     <ServiceItem
                     key={schedule.id.toString()}
                     data={schedule}
                     token={token}
                     onCanceled={(data) => setHistoryNextSchedules((items) => items.filter((i) => i.id !== data.id))}
                  />
                ))}
            </ul>

            <Footer buttons={[{
                value: 'Novo Agendamento',
                href: '/schedule-new',
                className: 'black',
            }]}/>
           
        </Page>
        </>
    )
}



export const getServerSideProps = withAuthentication(async(context: GetServerSidePropsContext) => {
    try {
        const {token} = context.req.session;
        const {data:schedules} = await axios.get<Schedule[]>('/schedules', {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Baerer ${token}`
            }
        })
        return {
            props: {
                schedules,
                token
            }
        }
    } catch (err) {
        return redirectToAuth(context);
    }
})


export default ComponentPage;