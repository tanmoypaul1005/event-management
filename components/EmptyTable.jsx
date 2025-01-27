"use client"
import React from 'react';
import { useDispatch } from 'react-redux';

const EmptyTable = () => {

    const dispatch = useDispatch();

    return (

        <tr class="container mb-5 w-full">
            <td colSpan="6">
                <div class="flex items-center mt-6 text-center border rounded-lg h-96">
                    <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
                        <div class="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <h1 class="mt-3 text-lg text-gray-800 dark:text-white">No vendors found</h1>
                        <p class="mt-2 text-gray-500 dark:text-gray-400">Your search “Stripe” did not match any vendors. Please try again or create add a new vendor.</p>
                        <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
                            <button class="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                                Clear Search
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>

    );
};

export default EmptyTable;