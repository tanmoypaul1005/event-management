"use client"

import CommonInput from '@/components/input/CommonInput';
import CommonModal from '@/components/modal/CommonModal';
import CommonTimePicker from '@/components/timePicker/CommonTimePicker';
import { useAddEventMutation } from '@/redux/features/event/eventApi';
import { handleEventFormFormChange, resetEventForm, setCurrentPage, setShowAddEventModal } from '@/redux/features/event/eventSlice';
import { Toastr, validateForm } from '@/util/utilityFunctions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddEventModal = () => {

    const { eventForm, showAddEventModal } = useSelector((state) => state.event);

    const [addEvent, { error }] = useAddEventMutation();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(handleEventFormFormChange({ field: name, value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = await validateForm(eventForm)
        if (!valid) return;
        const success = await addEvent(eventForm).unwrap();
        if (success?.success) {
            dispatch(resetEventForm());
            dispatch(setCurrentPage(1))
            dispatch(setShowAddEventModal(false));
        }
    }

    const handleClose = () => {
        dispatch(setShowAddEventModal(false))
    }

    return (
        <div>

            <CommonModal isOpen={showAddEventModal} onClose={handleClose} title="Add Event">
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-3'>
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
                    <CommonTimePicker
                        init_time={eventForm?.start_time}
                        onChange={(value) => {
                            dispatch(handleEventFormFormChange({ field: "start_time", value }));
                        }}
                        placeholder="Enter start time"
                        label='Start time'
                    />
                    <div className='my-[70px]'>
                        <CommonTimePicker
                            init_time={eventForm?.end_time}
                            onChange={(value) => {
                                dispatch(handleEventFormFormChange({ field: "end_time", value }));
                            }}
                            placeholder="Enter end time"
                            label='Edit time'
                        />
                    </div>
                    <div className=''>
                        <CommonInput
                            value={eventForm?.location}
                            onChange={handleChange}
                            name="location"
                            label="Location"
                            placeholder="Enter location"
                        />
                    </div>

                    <div className="border-t border-gray-300 pt-3 flex justify-end gap-x-4">
                        <button
                            onClick={handleClose}
                            type="button"
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


