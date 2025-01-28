"use client"
import CommonButton from '@/components/button/CommonButton';
import CommonModal from '@/components/modal/CommonModal';
import useLogin from '@/helper/hook/useLogin';
import { setEventFullFormEdit, setShowEditEventModal, setShowEventDetailsModal } from '@/redux/features/event/eventSlice';
import { base_url_raw } from '@/util/const';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon
} from 'react-share';

function EventDetailsModal() {

    const { showEventDetailsModal, eventDetails } = useSelector((state) => state.event);

    const dispatch = useDispatch();

    const { userInfo } = useLogin();

    const handleClose = () => {
        dispatch(setShowEventDetailsModal(false))
    }
    const shareUrl = base_url_raw; // You can customize this URL based on your requirements

    return (
        <div>
            <CommonModal isOpen={showEventDetailsModal} onClose={handleClose} title="Edit Details">
                <div className='mt-5 flex flex-col gap-y-3'>
                    <DetailRow label="Title" value={eventDetails?.title} />
                    <DetailRow label="Description" value={eventDetails?.description} />
                    <DetailRow label="Start time" value={eventDetails?.start_time} />
                    <DetailRow label="End Time" value={eventDetails?.end_time} />
                    <DetailRow label="Location" value={eventDetails?.location} />

                    <div className="border rounded-lg p-3 bg-gray-50 shadow-md">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">Event Creator Information</h3>
                        </div>
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                                {eventDetails?.user?.name?.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-700">Name</div>
                                <div className="text-sm text-gray-900">{eventDetails?.user?.name}</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                                @
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-700">Email</div>
                                <div className="text-sm text-gray-900">{eventDetails?.user?.email}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h3 className="text-lg font-semibold">Share this event:</h3>
                        <div className="flex gap-2 mt-2">
                            <FacebookShareButton url={shareUrl} quote={eventDetails?.title}>
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl} title={eventDetails?.title}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <LinkedinShareButton url={shareUrl} title={eventDetails?.title} summary={eventDetails?.description}>
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <WhatsappShareButton url={shareUrl} title={eventDetails?.title}>
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>
                    </div>

                    {userInfo?.data?._id == eventDetails?.user?._id && <div className='flex justify-center'>
                        <CommonButton
                            onClick={() => {
                                dispatch(setShowEventDetailsModal(false));
                                dispatch(setEventFullFormEdit(eventDetails))
                                dispatch(setShowEditEventModal(true))
                            }}
                            title={"Edit Event"}
                        />
                    </div>}
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
