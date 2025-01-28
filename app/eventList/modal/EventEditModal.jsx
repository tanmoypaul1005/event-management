"use client"

import CommonInput from '@/components/input/CommonInput';
import CommonModal from '@/components/modal/CommonModal';
import CommonTimePicker from '@/components/timePicke/CommonTimePicke';
import { useEditEventMutation } from '@/redux/features/event/eventApi';
import { handleEditEventFormFormChange, setEventFullFormEdit } from '@/redux/features/event/eventSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EventEditModal = ({ event }) => {

    const [open, setOpen] = useState(false)

    const { eventFormEdit } = useSelector((state) => state.event);

    const [editEvent] = useEditEventMutation();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(handleEditEventFormFormChange({ field: name, value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await editEvent({ id: event?._id, data: eventFormEdit }).unwrap();
        if (success?.success) {
            // dispatch(resetEventForm())
            setOpen(false);
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <div className='flex'>
                <button
                    onClick={() => {
                        dispatch(setEventFullFormEdit(event))
                        setOpen(true);
                    }}
                    className="mr-4" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
                        viewBox="0 0 348.882 348.882">
                        <path
                            d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                            data-original="#000000" />
                        <path
                            d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                            data-original="#000000" />
                    </svg>
                </button>
            </div>
            <CommonModal isOpen={open} onClose={handleClose} title="Edit Event">
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <CommonInput
                        value={eventFormEdit?.title}
                        onChange={handleChange}
                        name="title"
                        label="Title"
                        placeholder="Enter title"
                    />
                    <CommonInput
                        value={eventFormEdit?.description}
                        onChange={handleChange}
                        name="description"
                        label="Description"
                        placeholder="Enter description"
                    />
                    
                    <CommonTimePicker
                        init_time={eventFormEdit?.start_time}
                        onChange={(value) => {
                            dispatch(handleEditEventFormFormChange({ field: "start_time", value }));
                        }}
                        placeholder="Enter start time"
                        label='Start time'
                    />
                    <div className='mt-[70px]'>
                        <CommonTimePicker
                            init_time={eventFormEdit?.end_time}
                            onChange={(value) => {
                                dispatch(handleEditEventFormFormChange({ field: "end_time", value }));
                            }}
                            placeholder="Enter end time"
                            label='End time'
                        />
                    </div>

                    <div className='mt-[70px]'>
                        <CommonInput
                            value={eventFormEdit?.location}
                            onChange={handleChange}
                            name="location"
                            label="Location"
                            placeholder="Enter location"
                        />
                    </div>

                    <div className="border-t border-gray-300 pt-3 flex justify-end gap-x-4">
                        <button onClick={handleClose} type="button"
                            className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200">Close</button>
                        <button type="submit"
                            className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600">Save</button>
                    </div>
                </form>
            </CommonModal>
        </div>
    );
};

export default EventEditModal;