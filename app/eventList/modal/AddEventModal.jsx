"use client"

import CommonInput from '@/components/input/CommonInput';
import CommonModal from '@/components/modal/CommonModal';
import { useAddEventMutation } from '@/redux/features/event/eventApi';
import { handleEventFormFormChange, resetEventForm, setShowAddEventModal } from '@/redux/features/event/eventSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddEventModal = () => {

    // const [open, setOpen] = useState(false)

    const { eventForm ,showAddEventModal} = useSelector((state) => state.event);

    const [addEvent]=useAddEventMutation();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(handleEventFormFormChange({ field: name, value }));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const success=await addEvent(eventForm).unwrap();
        if(success?.success){
            dispatch(resetEventForm())
            dispatch(setShowAddEventModal(false));
        }
    }

    return (
        <div>
           
            <CommonModal isOpen={showAddEventModal} onClose={() => { dispatch(setShowAddEventModal(false)) }} title="Add Event">
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <CommonInput
                        value={eventForm?.title}
                        onChange={handleChange}
                        name="title"
                        label="Title"
                        placeholder="Enter title"
                    />
                    <CommonInput
                        value={eventForm?.description}
                        onChange={handleChange}
                        name="description"
                        label="Description"
                        placeholder="Enter description"
                    />
                    <CommonInput
                        value={eventForm?.start_time}
                        onChange={handleChange}
                        name="start_time"
                        label="Start Time"
                        placeholder="Enter start time"
                    />
                    <CommonInput
                        value={eventForm?.end_time}
                        onChange={handleChange}
                        name="end_time"
                        label="End Time"
                        placeholder="Enter end time"
                    />
                    <CommonInput
                        value={eventForm?.location}
                        onChange={handleChange}
                        name="location"
                        label="Location"
                        placeholder="Enter location"
                    />

                    <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
                        <button type="button"
                            className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200">Close</button>
                        <button type="submit"
                            className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600">Save</button>
                    </div>
                </form>
            </CommonModal>
        </div>
    );
};

export default AddEventModal;