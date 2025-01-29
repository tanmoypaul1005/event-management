"use client"

import CommonInput from '@/components/input/CommonInput';
import CommonModal from '@/components/modal/CommonModal';
import CommonTimePicker from '@/components/timePicker/CommonTimePicker';
import { useEditEventMutation } from '@/redux/features/event/eventApi';
import { handleEditEventFormFormChange, setShowEditEventModal } from '@/redux/features/event/eventSlice';
import { formatDate, validateForm } from '@/util/utilityFunctions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EventEditModal = () => {

    const { eventFormEdit, showEditEventModal } = useSelector((state) => state.event);

    const [editEvent] = useEditEventMutation();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(handleEditEventFormFormChange({ field: name, value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { _id, ...itemWithoutId } = eventFormEdit;
        const valid = await validateForm(itemWithoutId)
        if (!valid) return;
        const success = await editEvent({ id: _id, data: itemWithoutId }).unwrap();
        if (success?.success) {
            handleClose();
        }
    }

    const handleClose = () => {
        dispatch(setShowEditEventModal(false))
    }

    return (
        <div>
            <CommonModal isOpen={showEditEventModal} onClose={handleClose} title="Edit Event">
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-4'>
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

                    <CommonInput
                       value={formatDate(eventFormEdit?.date)}
                        onChange={handleChange}
                        type='date'
                        name="date"
                        label="Date"
                        placeholder="Enter Date"
                    />

                    <CommonTimePicker
                        init_time={eventFormEdit?.start_time}
                        onChange={(value) => {
                            dispatch(handleEditEventFormFormChange({ field: "start_time", value }));
                        }}
                        placeholder="Enter start time"
                        label='Start time'
                    />
                    <div className='my-[70px]'>
                        <CommonTimePicker
                            init_time={eventFormEdit?.end_time}
                            onChange={(value) => {
                                dispatch(handleEditEventFormFormChange({ field: "end_time", value }));
                            }}
                            placeholder="Enter end time"
                            label='End time'
                        />
                    </div>

                    <div className=''>
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