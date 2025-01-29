"use client"
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLazyGetEventQuery } from '@/redux/features/event/eventApi';
import { useSelector } from 'react-redux';
import { ImSpinner3 } from 'react-icons/im';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function CalenderView({ isTableView }) {

    const [currentDate, setCurrentDate] = useState(new Date());

    const [getEvent, { data: event }] = useLazyGetEventQuery();

    const { currentPage, searchLoading } = useSelector((state) => state.event);

    const localizer = momentLocalizer(moment);

    // Handle Navigation (Next/Previous Buttons)
    const handleNavigate = (newDate) => {
        setCurrentDate(newDate);
    };


    useEffect(() => {
        getEvent({ search: "", page: currentPage, limit: 1000 });
    }, [currentPage, isTableView,currentDate]);

    const myEventsList = event?.events?.map((item) => {
        return {
            title: item?.title,
            start: item?.date ? new Date(item?.date) : new Date(item?.createdAt),
            end: item?.date ? new Date(item?.date) : new Date(item?.createdAt),
        }
    })

    return (
        <div className=''>
            {!searchLoading ? <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                titleAccessor="title"
                views={['month']}
                defaultView="month"
                date={currentDate} // Ensure navigation works
                onNavigate={handleNavigate} // Update date state on navigation
                style={{ height: 500 }}
                components={{
                    toolbar: CustomToolbar,
                }}
            />
                :
                <div className='flex flex-col justify-center items-center w-full h-[40vh]'>
                    <ImSpinner3 className="w-[150px] h-[150px] animate-spin" />
                    Loading ........
                </div>
            }
        </div>
    )
}

export default CalenderView




const CustomToolbar = (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const goToToday = () => {
        toolbar.onNavigate('TODAY');
    };

    const label = () => {
        const date = moment(toolbar.date);
        return (
            <span className="text-2xl font-bold text-gray-800">
                {date.format('MMMM YYYY')}
            </span>
        );
    };

    return (
        <div className="flex gap-x-5 items-center mb-4">
            <button
                onClick={goToBack}
                className="flex items-center text-[14px] px-4 py-1.5 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            >
                <FaChevronLeft className="mr-2" />
                Previous
            </button>

            <button
                onClick={goToToday}
                className="flex text-[14px] items-center px-4 py-1.5 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300"
            >
                Today
            </button>
            <button
                onClick={goToNext}
                className="flex text-[14px] items-center px-4 py-1.5 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            >
                Next
                <FaChevronRight className="ml-2" />
            </button>

            <div>{label()}</div>
        </div>
    );
};