"use client"
import CommonModal from '@/components/modal/CommonModal';
import { setShowEventDetailsModal } from '@/redux/features/event/eventSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function EventDetailsModal() {

    const { showEventDetailsModal, eventDetails } = useSelector((state) => state.event);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setShowEventDetailsModal(false))
    }

    return (
        <div>
            <CommonModal isOpen={showEventDetailsModal} onClose={handleClose} title="Edit Details">
                <div className='mt-5 flex flex-col gap-y-3'>
                    <DetailRow label="Title" value={eventDetails?.title} />
                    <DetailRow label="Description" value={eventDetails?.description} />
                    <DetailRow label="Start time" value={eventDetails?.start_time} />
                    <DetailRow label="End Time" value={eventDetails?.end_time} />
                    <DetailRow label="Location" value={eventDetails?.location} />
                </div>
            </CommonModal>
        </div>
    )
}

export default EventDetailsModal


const DetailRow = ({ label, value }) => (
    <div className='flex justify-between'>
        <div className='text-[16px] text-gray-700 font-medium'>{label}</div>
        <div className='text-[16px] text-gray-700 font-medium'>{value}</div>
    </div>
);
