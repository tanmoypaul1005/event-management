"use client"
import CommonInput from '@/components/input/CommonInput';
import CommonModal from '@/components/modal/CommonModal';
import React, { useState } from 'react';

const AddEventModal = () => {

    const [open, setOpen] = useState(false)

    return (
        <div>
            <div onClick={() => { setOpen(true) }}>Add</div>
            <CommonModal isOpen={open} onClose={() => {  setOpen(false)}} title="Add Event">
                <div className='flex flex-col gap-4'>
                    <CommonInput label="Title" placeholder="Enter title" />
                    <CommonInput label="Description" placeholder="Enter description" />
                    <CommonInput label="Start Time" placeholder="Enter start time" />
                    <CommonInput label="End Time" placeholder="Enter end time" />
                    <CommonInput label="Location" placeholder="Enter location" />
                </div>
            </CommonModal>
        </div>
    );
};

export default AddEventModal;