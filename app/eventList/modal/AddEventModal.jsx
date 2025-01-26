"use client"
import CommonButton from '@/components/button/CommonButton';
import CommonInput from '@/components/input/CommonInput';
import CommonModal from '@/components/modal/CommonModal';
import Search from '@/components/search/Search';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddEventModal = () => {

    const [open, setOpen] = useState(false)

    const { eventForm } = useSelector((state) => state.event);

    const router = useRouter();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(handleEventFormChange({ name, value }));
    };

    return (
        <div>
            <div className='flex w-full justify-between mb-5'>
                <Search />
                <CommonButton title="Add Event" onClick={() => { setOpen(true) }} />
            </div>
            <CommonModal isOpen={open} onClose={() => { setOpen(false) }} title="Add Event">
                <div className='flex flex-col gap-4'>
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
                </div>
            </CommonModal>
        </div>
    );
};

export default AddEventModal;