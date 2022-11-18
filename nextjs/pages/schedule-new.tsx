import { NextPage } from "next";
import { format } from "date-fns"; 
import Head from "../components/Head";
import Footer from "../components/Page/Footer";
import Header from "../components/home/Header";
import Page from "../components/Page";
import { BackButton } from "../components/Page/Footer/Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Calendar from "../components/Calendar";
import Toast from "../components/Toast";
import { get } from "lodash";

type FormData = {
    scheduleAt: string;
}

const ComponentPage: NextPage = () => {

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        setError,
        clearErrors,
        formState: {errors}
    } = useForm<FormData>();

    const router = useRouter();
    const scheduleAt = watch('scheduleAt', format(new Date(), 'yyyy-MM-dd'));

    const onSubmit:SubmitHandler<FormData> = ({scheduleAt}) => {
        axios.post('/api/schedules/new', {
            scheduleAt, // esta passando a data
        }).then(()=>{
            router.push('/schedules-time-options')
        }).catch((err)=> {
            setError('scheduleAt', { message: err.response.data.message ?? err.message} )
        })
    }

    return (
        <>
            <Head />
            <Header/>
            <Page pageColor="blue" title="Escolha a Data" id="schedule-new">
                <Calendar
                    onChange={(selectedDate)=> setValue('scheduleAt', format(selectedDate, 'yyyy-MM-dd'))}
                    selected={new Date()}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('scheduleAt', {value: scheduleAt})} />

                <Toast
                    type="danger"
                    open={Object.keys(errors).length > 0}
                    onClose={()=>clearErrors()}
                >
                   {Object.keys(errors).map((key)=>(
                    <p key={key}>{get(errors, `${key}.message`)}</p>
                   ))}
                </Toast>

                <Footer
                    buttons={[
                        BackButton,
                        {
                            value: 'Continuar',
                            type: 'submit',
                            disabled: false,
                        }
                ]}/>
                </form>
            </Page>
        </>
    )
}

export default ComponentPage;