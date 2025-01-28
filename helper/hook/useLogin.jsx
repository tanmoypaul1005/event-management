"use client"
import { useLazyGetUserDetailsQuery } from '@/redux/features/auth/authApi';
import { useEffect } from 'react';


const useLogin = () => {
    const [getUserDetails, { data: userInfo, error, isLoading }] = useLazyGetUserDetailsQuery();

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);
    console.log("sss", userInfo)
    return { userInfo, error, isLoading };
};

export default useLogin;