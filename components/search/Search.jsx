import { setCurrentPage, setEventSearch } from '@/redux/features/event/eventSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineClear } from "react-icons/md";

const Search = () => {

    const { eventSearch, searchLoading } = useSelector((state) => state.event);

    const dispatch = useDispatch();

    return (
        <div className="flex relative pl-4 pr-8 lg:w-[400px] py-2 rounded-md border-2 border-blue-500 overflow-hidden  font-[sans-serif]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                className="fill-gray-600 mr-3 rotate-90">
                <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                </path>
            </svg>
            <input value={eventSearch}
                onChange={(e) => {
                    if (e.target.value === "") {
                        dispatch(setCurrentPage(1));
                    }
                    dispatch(setEventSearch(e.target.value))
                }}
                type="text" placeholder="Search title,description,location,time"
                className="w-full outline-none bg-transparent text-gray-600 text-sm"
            />
            {searchLoading && (
                <ImSpinner2 className="absolute right-2 flex justify-center items-center w-[15px] h-[18px] mt-[2px] animate-spin" />
            )}

            {eventSearch && <div onClick={() => {
                dispatch(setEventSearch(""))
            }} className='absolute right-2 cursor-pointer flex justify-center items-center h-4 w-4'>
                <MdOutlineClear />
            </div>}
        </div>
    );
};

export default Search;