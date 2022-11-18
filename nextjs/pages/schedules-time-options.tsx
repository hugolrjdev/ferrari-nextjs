import axios from "axios";
import { format, getDay, parse, parseJSON } from "date-fns";
import { NextPage } from "next"
import { useRouter } from "next/router";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Head from "../components/Head";
import Header from "../components/home/Header";
import Page from "../components/Page";
import { ScheduleSession } from "../types/ScheduleSession";
import { TimeOption } from "../types/TimeOption";
import locale from 'date-fns/locale/pt-BR';
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../ultils/session";
import { Redirect } from "next/dist/lib/load-custom-routes";


type ComponentPageProps = {
    schedule: ScheduleSession;
    timeOptions: TimeOption[];
}

type FormData = {
    scheduleAt: string;
    timeOptionId: string;
}

const ComponentPage: NextPage<ComponentPageProps> = (props) => {

    const { handleSubmit, register, formState: {errors}, clearErrors, setError } = useForm<FormData>();
    const router = useRouter();
    const [scheduleAt] = useState(String(props.schedule.scheduleAt));
    //?? null coallesce operator
    const [timeOptions] = useState<TimeOption[]>(props.timeOptions ?? []);

    const onSubmit:SubmitHandler<FormData> = (data) => {
        axios.post('/api/schedules/time-options', data).then(
            ()=>router.push('/schedules-services')
        ).catch( (err)=> {
            setError('scheduleAt', {message: err.response.data.message ?? err.message})
        });
    }

    return <>
            <Head />
            <Header/>
            <Page pageColor="blue" title="Escolha o Horário" id="time-options">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('scheduleAt', {value: scheduleAt})} />
                    <h3>{format(parse(scheduleAt, 'yyyy-MM-dd', new Date()), "EEEE, d ' de ' MMMM ' de ' yyyy", {locale})}</h3>
                    <div className="options">
                        {timeOptions.map(({time, id})=>(
                            <label key={id.toString()}>
                                <input type="radio" {...register('timeOptionId', {
                                    required: 'Selecione um horário',
                                })}/>
                                <span>{format(parseJSON(time), 'HH:mm')}</span>
                            </label>
                        ))}
                    </div>
                </form>
            </Page>
    </>
}

export const getServerSideProps = withIronSessionSsr(async ({req}) => {
    if(!req.session.schedule.scheduleAt){
        return {
            redirect: {
                destination: '/schedules-new',
            } as Redirect,
        }
    }

    const {schedule} = req.session;
    const day = getDay(parse(String(schedule.scheduleAt), 'yyyy-MM-dd', new Date()));

    const {data: timeOptions} = await axios.get('/time-options', {
        baseURL: process.env.API_URL,
        params: {
            day,
        },
    })

    return {
        props: {
            schedule,
            timeOptions,
        }
    }

}, sessionOptions)



export default ComponentPage;