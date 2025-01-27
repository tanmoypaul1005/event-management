"use client"
import React, { useEffect } from 'react';
import AddEventModal from './modal/AddEventModal';
import { useDeleteEventMutation, useLazyGetEventQuery } from '@/redux/features/event/eventApi';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import EmptyTable from '@/components/EmptyTable';
import Search from '@/components/search/Search';
import CommonButton from '@/components/button/CommonButton';
import { setShowAddEventModal } from '@/redux/features/event/eventSlice';
import EventEditModal from './modal/EventEditModal';

const EventList = () => {

    const { eventSearch } = useSelector((state) => state.event);

    const [searchValue] = useDebounce(eventSearch, 1000);

    const [getEvent, { data: event }] = useLazyGetEventQuery();

    const dispatch = useDispatch();

    const [deleteEvent] = useDeleteEventMutation();

    const handleDelete = async (id) => {
        const success = await deleteEvent(id);
    }

    useEffect(() => {
        getEvent(eventSearch);
    }, [searchValue])

    // console.log("event", event);

    return (
        <>
            <AddEventModal />
            <div className='flex w-full justify-between mb-5'>
                <Search />
                <CommonButton title="Add Event" onClick={() => { dispatch(setShowAddEventModal(true)) }} />
            </div>
            <div>
                <div className="font-sans overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 whitespace-nowrap">
                            <tr>
                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                    Title
                                </th>
                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                    Description
                                </th>
                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                    Start Time
                                </th>
                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                    End Time
                                </th>
                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                    Location
                                </th>
                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="whitespace-nowrap">
                            {
                                event?.data?.length > 0 ?
                                    event?.data?.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-4 text-[15px] text-gray-800">
                                                {item?.title}
                                            </td>
                                            <td className="p-4 text-[15px] text-gray-800">
                                                {item?.description}
                                            </td>
                                            <td className="p-4 text-[15px] text-gray-800">
                                                {item?.start_time}
                                            </td>
                                            <td className="p-4 text-[15px] text-gray-800">
                                                {item?.end_time}
                                            </td>
                                            <td className="p-4 text-[15px] text-gray-800">
                                                {item?.location}
                                            </td>
                                            <td className="p-4 flex items-center">
                                                <EventEditModal event={item} />
                                                <button onClick={() => handleDelete(item?._id)} className="mr-4" title="Delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                                        <path
                                                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                            data-original="#000000" />
                                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                            data-original="#000000" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    :

                                    <EmptyTable />
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default EventList;