import { addDays, addMonths, differenceInSeconds, endOfMonth, endOfWeek, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import locale from 'date-fns/locale/pt-BR';
import { IconNext, IconPrev } from '../../ultils/icons/Icons';


type CalendarProps = {
    onChange?: (date: Date) => void;
    selected?: Date | null;
}

const Calendar = ({onChange, selected = null}:CalendarProps) => {

    const [dates, setDates] = useState<Date[]>([]);
    const [today] = useState<Date>(new Date);
    const [startMonth, setStartMonth] = useState(startOfMonth(new Date));
    const [startAt, setStartAt] = useState(startOfWeek(new Date));
    const [endAt, setEndAt] = useState(endOfWeek(endOfMonth(new Date)));
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected)

    const onBtnPrev =  () => {
        setStartMonth(subMonths(startMonth, 1))
    }

    const onBtnNext =  () => {
        setStartMonth(addMonths(startMonth, 1))
    }

    const onBtnToday =  () => {
        setStartMonth(startOfMonth(new Date));
    }

    const callOnChange = useCallback(
            (date: Date | null) => {
                if(date instanceof Date && typeof onChange === 'function'){
                    onChange(date);
                }
            },[onChange]
    );

    useEffect(()=>{callOnChange}, [selectedDate]);

    //sempre que o calendario mudar atualiza onde ele começa e onde ele termina
    useEffect(()=>{setStartAt(startOfWeek(startMonth))}, [selectedDate]);

    //sempre calendario mudar, atualiza as datas que serão mostradas
    useEffect(()=>{
        let day = new Date(startAt.getTime());
        const newDates: Date[]= []; // mes inteiro, toda vez que mudar um dia atualiza

        while (differenceInSeconds(endAt, day) > 0) {
            newDates.push(day);
            day = addDays(day , 1);
        }
        setDates(newDates);
    }, [startAt, endAt]); //cria o calendario do mÊs

  return (
    <div className='calendar'>
        <div className="month">
            <button 
            type='button'
            className='btn-today'
            onClick={()=>{onBtnToday()}}
            >
            hoje
            </button>
            <h2>{format(startMonth, 'MMMM yyyy', { locale })}</h2>
            <nav>
                <button
                type='button'
                className='btn-prev'
                onClick={()=>onBtnPrev()}
                >
                <IconPrev/>
                </button>
                <button
                type='button'
                className='btn-next'
                onClick={()=>onBtnNext()}
                >
                <IconNext/>
            </button>
        </nav>
        </div>

        <ul className="weekdays">
            <li>Dom</li>
            <li>Seg</li>
            <li>Ter</li>
            <li>Qua</li>
            <li>Qui</li>
            <li>Sex</li>
            <li>Sab</li>
        </ul>
        <ul className="days">
            {dates.map((date)=>(
                <li
                    key={format(date, 'yyyy-MM-dd')}
                    className={[selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') && 'selected',
                    format(date, 'MM') < format(startMonth, 'MM') && 'month-prev',
                    format(date, 'MM') > format(startMonth, 'MM') && 'month-next',
                    format(today, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy') && 'active',
                ].join(' ')}
                    onClick={()=>setSelectedDate(date)}
                >
                    {format(date, 'd')}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Calendar;