import axios from "axios";
import React from "react"
import { Schedule } from "../../types/Schedule"

type ServiceItemProps = {
    data: Schedule;
    onCanceled: (data: Schedule)=>void;
    token: string;
}

const ServiceItem = ({token, data, onCanceled}:ServiceItemProps) => {

    const onClickCancel = () => {
        if(confirm('Deseja realmente cancelar este agendamento')){
            axios.delete(`schedules/${data.id}`, {
                baseURL: process.env.API_URL,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(()=>{
                if(typeof onCanceled === 'function'){
                    onCanceled(data)
                }
            }).catch((err)=>alert('Não foi possivel cancelar este agendamento'))
        }
    }

    return <li key={data.id.toString()}>
        <section>
            <div>
                <label htmlFor="">Data</label>
                <span>
                    {new Intl.DateTimeFormat('pt-br').format(new Date(data.scheduleAt))}
                    {' - '}
                    {data.timeOption?.time ?
                    new Intl.DateTimeFormat('pt-br', {hour: 'numeric', minute: 'numeric'}).format(new Date(data.timeOption?.time)) : ''}
                </span>
            </div>
            <div>
                <label htmlFor="">Status</label>
                <span>{data.paymentSituation?.name}</span>
            </div>
            <div>
                <label htmlFor="">Valor</label>
                <span>{new Intl.NumberFormat('pt-br', {style: 'currency', currency:'BRL'}).format(data.total)}</span>
            </div>
            <div>
                <label htmlFor="">Serviços</label>
                <span>{data.scheduleService?.map((ss)=>ss.service?.name).join(', ')}</span>
            </div>
        </section>
        <button type="button" className="cancel" onClick={onClickCancel}>Cancelar</button>
    </li>
}

export default ServiceItem