"use client"
import { setCurrentPage, setEventSearch, setTableView } from '@/redux/features/event/eventSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CiBoxList } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";

function ViewToggle() {

    const dispatch=useDispatch();

    const { isTableView } = useSelector((state) => state.event);

    return (
        <div className='flex gap-x-3'>
            <div
                onClick={() => {
                    dispatch(setTableView(true));
                    dispatch(setCurrentPage(1));
                    dispatch(setEventSearch(""))
                }}
                className={`p-2 rounded cursor-pointer ${isTableView ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
                <CiBoxList size={24} />
            </div>
            <div
                onClick={() => { dispatch(setTableView(false)) }}
                className={`p-2 rounded cursor-pointer ${!isTableView ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
                <CiCalendar size={24} />
            </div>
        </div>
    )
}

export default ViewToggle
