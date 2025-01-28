"use client"
import EventEditModal from '@/app/eventList/modal/EventEditModal';
import CommonButton from '@/components/button/CommonButton';
import useLogin from '@/helper/hook/useLogin';
import { useDeleteEventMutation, useLazyGetEventDetailsQuery } from '@/redux/features/event/eventApi';
import { setEventFullFormEdit, setShowEditEventModal } from '@/redux/features/event/eventSlice';
import { base_url_raw } from '@/util/const';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { FaArrowLeftLong } from "react-icons/fa6";

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
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function EventDetails({ params }) {

    const dispatch = useDispatch();

    const router = useRouter();

    const { userInfo } = useLogin();

    const [deleteEvent] = useDeleteEventMutation();

    const [getEventDetails, { data: eventDetails }] = useLazyGetEventDetailsQuery();

    useEffect(() => {
        if (params?.event_id) getEventDetails(params?.event_id)
    }, [params?.event_id])

    const shareUrl = base_url_raw + `/event/${eventDetails?.data?._id}`; // You can customize this URL based on your requirements

    return (
        <div className='px-10 py-6'>
            <EventEditModal />
            <div className='flex justify-between items-center border-b pb-2'>
                <div className='gap-x-3 flex justify-center items-center'>
                    <Link href={"/"}><FaArrowLeftLong /></Link>
                    <div className='text-[20px] text-gray-700 font-semibold'>Event Details</div>
                </div>
                {(userInfo?.data?._id == eventDetails?.data?.user?._id) && <div className='flex gap-x-3'>
                    <button onClick={async (e) => {
                        e.stopPropagation();
                        const success = await deleteEvent(eventDetails?.data?._id).unwrap();
                        if (success?.success) {
                            router.push("/")
                        }
                    }} className="mr-4" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                            <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000" />
                            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000" />
                        </svg>
                    </button>

                    <button
                        onClick={() => {
                            // dispatch(setShowEventDetailsModal(false));
                            dispatch(setEventFullFormEdit(eventDetails?.data))
                            dispatch(setShowEditEventModal(true))
                        }}
                        className="mr-4 w-6 flex justify-center" title="Edit">
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
                </div>}
            </div>
            <div className='mt-5 flex flex-col gap-y-2'>
                <DetailRow label="Title" value={eventDetails?.data?.title} />
                <DetailRow label="Description" value={eventDetails?.data?.description} />
                <DetailRow label="Start time" value={eventDetails?.data?.start_time} />
                <DetailRow label="End Time" value={eventDetails?.data?.end_time} />
                <DetailRow label="Location" value={eventDetails?.data?.location} />

                <div className="border rounded-lg p-3 bg-gray-50 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[16px] font-semibold text-gray-800">Event Creator Information</h3>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                            {eventDetails?.data?.user?.name?.charAt(0)}
                        </div>
                        <div>
                            <div className="text-[14px] font-medium text-gray-700">Name</div>
                            <div className="text-[14px] text-gray-900">{eventDetails?.data?.user?.name}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                            @
                        </div>
                        <div>
                            <div className="text-[14px] font-medium text-gray-700">Email</div>
                            <div className="text-[14px] text-gray-900">{eventDetails?.data?.user?.email}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <h3 className="text-lg font-semibold">Share this event:</h3>
                    <div className="flex gap-2 mt-2">
                        <FacebookShareButton url={shareUrl} quote={eventDetails?.data?.title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={eventDetails?.data?.title}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={shareUrl} title={eventDetails?.data?.title} summary={eventDetails?.data?.description}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <WhatsappShareButton url={shareUrl} title={eventDetails?.data?.title}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetails

const DetailRow = ({ label, value }) => (
    <div className='flex justify-between'>
        <div className='text-[12px] text-gray-700 font-medium'>{label}</div>
        <div className='text-[12px] text-gray-700 font-medium'>{value}</div>
    </div>
);
