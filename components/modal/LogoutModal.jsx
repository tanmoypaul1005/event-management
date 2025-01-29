"use client"
import React, { useState } from 'react';
import CommonModal from './CommonModal';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/redux/features/auth/authApi';
import CancelButton from '../button/CancelButton';

const LogoutModal = () => {

    const [open, setOpen] = useState(false);

    const router = useRouter();

    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        const success = await logout().unwrap();
        if (success?.success) {
            router.push("/login")
            setOpen(false);
        }
    }

    return (
        <div>
            <button
                onClick={() => { setOpen(true) }}
                className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Logout</button>
            <CommonModal
                isOpen={open}
                onClose={() => { setOpen(false) }}
                title="Logout Confirmation"
            >
                <div>
                    <p className="text-gray-700 text-lg my-3">Are you sure you want to logout?</p>
                    <div className="flex justify-end space-x-4">
                        <CancelButton onClick={() => setOpen(false)} />
                        <button
                            onClick={() => {
                                handleLogout()
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all ease-in-out duration-300">
                            Logout
                        </button>
                    </div>
                </div>
            </CommonModal>
        </div>
    );
};

export default LogoutModal;