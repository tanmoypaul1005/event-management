"use client"
import React from 'react';

const EmptyTable = () => {

    return (

        <tr className="container mb-5 w-full">
            <td colSpan="8">
                <div className="flex items-center text-center rounded-lg h-96">
                    <div className="flex flex-col justify-center items-center w-full max-w-sm px-4 mx-auto">
                        <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <h1 className="mt-3 text-lg text-gray-500">No event found</h1>
                        <p className="mt-2 text-gray-500 text-center">There are no events available. Please add a new event to get started.</p>
                    </div>
                </div>
            </td>
        </tr>

    );
};

export default EmptyTable;