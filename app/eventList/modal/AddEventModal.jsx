"use client"
import CommonModal from '@/components/modal/CommonModal';
import React, { useState } from 'react';

const AddEventModal = () => {

    const [open, setOpen] = useState(false)

    return (
        <div>
            <div onClick={() => { setOpen(true) }}>Add</div>
            <CommonModal isOpen={open} onClose={() => {  setOpen(false)}} title="Add Event">
                dddddddddddddd
            </CommonModal>
        </div>
    );
};

export default AddEventModal;