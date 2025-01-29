"use client"
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLazyGetEventQuery } from '@/redux/features/event/eventApi';
import { useSelector } from 'react-redux';

function CalenderView() {

    const [currentDate, setCurrentDate] = useState(new Date());

    const [getEvent, { data: event }] = useLazyGetEventQuery();

    const { currentPage } = useSelector((state) => state.event);

    const localizer = momentLocalizer(moment);

    // Handle Navigation (Next/Previous Buttons)
    const handleNavigate = (newDate) => {
        setCurrentDate(newDate);
    };


    useEffect(() => {
        getEvent({ search: "", page: currentPage,limit:1000 });
    }, [currentPage]);

    const myEventsList = event?.events?.map((item)=>{
        return {
            title:item?.title,
            start:item?.date ? new Date(item?.date) : new Date(item?.createdAt),
            end: item?.date ? new Date(item?.date) : new Date(item?.createdAt),
        }
    })

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                titleAccessor="title"
                views={['month']}
                defaultView="month"
                date={currentDate} // Ensure navigation works
                onNavigate={handleNavigate} // Update date state on navigation
                style={{ height: 500 }}
            />
        </div>
    )
}

export default CalenderView
