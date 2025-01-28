/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

function TimePickerNew({ init_time = null, size = "large", endTime = null, selectAction, showExtendedTimeUi = true, isCurrentTimeValidation = false }) {

    const [hour, setHour] = useState('12')
    const [minute, setMinute] = useState('00')
    const [time, setTime] = useState(null)

    const [endHour, setEndHour] = useState('2')
    const [endMinute, setEndMinute] = useState('00')
    const [eTime, setETime] = useState(null) // end time


    // setup initial times
    useEffect(() => {
        let curr_hour = (new Date()).getHours();
        let curr_min = (new Date()).getMinutes();
        curr_min = Math.ceil(curr_min / 15) * 15;

        if (curr_min === 60) {
            curr_min = 0;
            curr_hour += 1;
        }

        if (curr_hour === 24) {
            curr_hour = 0;
        }

        if (curr_hour.toString().length < 2) curr_hour = '0' + curr_hour;
        if (curr_min.toString().length < 2) curr_min = '0' + curr_min;

        let curr_end_hour = curr_hour + 2;
        let curr_end_min = curr_min;

        //console.log("Initial Time", init_time);
        //console.log("End Time", endTime);

        if (init_time) {
            const time_array = init_time?.split(":");
            curr_hour = time_array[0] || (new Date()).getHours()
            curr_min = time_array[1] || ((new Date()).getMinutes())
        }

        if (endTime) {
            const end_time_array = endTime?.split(":");
            curr_end_hour = end_time_array[0] || (new Date()).getHours()
            curr_end_min = end_time_array[1] || (new Date()).getMinutes()
        }

        if (curr_hour.toString().length < 2) curr_hour = '0' + curr_hour
        if (curr_min.toString().length < 2) curr_min = '0' + curr_min

        if (curr_end_hour.toString().length < 2) curr_end_hour = '0' + curr_end_hour
        if (curr_end_min.toString().length < 2) curr_end_min = '0' + curr_end_min

        setHour(curr_hour)
        setMinute(curr_min)

        setEndHour(curr_end_hour)
        setEndMinute(curr_end_min)
        //console.log('time_picker: ', init_time);
    }, [])

    // if hour or minute value changes update time
    useEffect(() => {
        setTime(`${hour}:${minute}`)
    }, [hour, minute])

    // if hour or minute value changes update end time
    useEffect(() => {
        setETime(`${endHour}:${endMinute}`)
    }, [endHour, endMinute])

    //it time or end time change, update time-picker data
    useEffect(() => {
        if (selectAction) selectAction(time, eTime)
    }, [time, eTime])

    // Get current hour
    const now = new Date();
    const currentHour = now.getHours();

    const hourChange = (action) => {
        let curr_hour = parseInt(hour);
        let new_hour = curr_hour

        // Get current hour
        const now = new Date();
        const currentHour = now.getHours();

        if (action === 'up') {
            if (curr_hour === 23) {
                new_hour = 0
            } else {
                new_hour = curr_hour + 1
            }
        } else {
            if (curr_hour === 0) {
                new_hour = 23
            } else {
                new_hour = curr_hour - 1
            }
        }

        // Prevent selecting time earlier than current time
        if (isCurrentTimeValidation && (new_hour < currentHour)) {
            return;
        }

        if (new_hour.toString().length < 2) new_hour = '0' + new_hour
        setHour(new_hour)
    }

    const minuteChange = (action) => {
        let curr_min = parseInt(minute);
        let new_min = curr_min

        // Get current minute
        const now = new Date();
        const currentMinute = now.getMinutes();

        if (action === 'up') {
            if (new_min >= 59) {
                new_min = new_min - 60
                hourChange('up')
            } else {
                new_min = new_min + 15
                if (new_min >= 59) {
                    new_min = new_min - 60
                    hourChange('up')
                }
            }
        } else {
            if (new_min < 0) {
                new_min = new_min + 60
                hourChange('down')
            } else {
                new_min = new_min - 15
                if (new_min < 0) {
                    new_min = new_min + 60
                    hourChange('down')
                }
            }
        }

        // Prevent selecting time earlier than current time
        if (isCurrentTimeValidation) {
            if (parseInt(hour) < currentHour || (parseInt(hour) === currentHour && new_min < currentMinute)) {
                return;
            }
        }

        if (new_min.toString().length < 2) new_min = '0' + new_min
        setMinute(new_min)
    }

    // update end time from plus or minus button action
    useEffect(() => {
        let tempEndHour = parseInt(hour) + 2;
        if (tempEndHour > 23) tempEndHour = tempEndHour - 24
        if (tempEndHour.toString().length < 2) tempEndHour = '0' + tempEndHour
        setEndHour(tempEndHour)
        setEndMinute(minute)
        setETime(`${tempEndHour}:${minute}`)
    }, [hour, minute])

    return (
        <div className='inline-block px-2 text-gray-700 bg-white rounded-lg shadow-lg outline-none'>
            <div className='flex items-center justify-between outline-none'>
                <div className={`flex flex-col items-center justify-between px-1 text-4xl rounded-lg select-none cursor-n-resize`}>
                    <IoIosArrowUp className='p-2 m-1 cursor-pointer hover:bg-cListItem rounded-br5' onClick={(e) => hourChange('up')} />
                    <div>{hour}</div>
                    <IoIosArrowDown className='p-2 m-1 cursor-pointer hover:bg-cListItem rounded-br5' onClick={(e) => hourChange('down')} />
                </div>
                <div className='px-2 text-4xl'>:</div>
                <div className='flex flex-col items-center justify-between px-1 text-4xl rounded-lg select-none cursor-n-resize'>
                    <IoIosArrowUp className='p-2 m-1 cursor-pointer hover:bg-cListItem rounded-br5' onClick={(e) => minuteChange('up')} />
                    <div>{minute}</div>
                    <IoIosArrowDown className='p-2 m-1 cursor-pointer hover:bg-cListItem rounded-br5' onClick={(e) => minuteChange('down')} />
                </div>
            </div>


        </div>
    )
}

export default TimePickerNew
