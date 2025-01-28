
import React, { useEffect, useState } from 'react';
// import { iClockGray, iGrayCancel } from '../../app/utility/imageImports';
import TimePickerNew from './TimePickerNew';
import FreeDropDown from '../FreeDropDow';

const CommonTimePicker = ({
    selectAction = () => { },
    onChange = () => { },
    endTime,
    init_time = "00:00",
    label = "Select Time",
    showExtendedTimeUi = true,
    heightClass = "h-s48",
    marginClass = "",
    isCurrentTimeValidation = false,
    placeholder

}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(init_time ?? '');
    }, [init_time]);

    return (
        <div className={`relative w-full ${heightClass} outline-none ${marginClass}`}>
            {/* <div className='absolute bottom-0 left-0'>
                <input value={value ?? ''} onChange={() => { }} required={required} className="z-0 outline-none h-s1" />
            </div> */}
            <div className={`outline-visible outline-hidden absolute outline-none top-0 left-0 bg-white ${heightClass} w-full z-10`}>
                <FreeDropDown
                   
                    width={500}
                    body={
                        <TimePickerNew
                            isCurrentTimeValidation={isCurrentTimeValidation}
                            endTime={endTime}
                            init_time={value ? value : init_time}
                            showExtendedTimeUi={showExtendedTimeUi}
                            selectAction={(e, f) => {
                                setValue(e);
                                selectAction(e, f);
                                onChange(e, f);
                            }}
                        />
                    }
                    button={
                        <div className='w-full z-1'>
                            <label className="text-gray-800 text-left justify-start items-center text-sm mb-2 block">{label}</label>
                            <div
                                className={"w-full text-start flex justify-start text-sm text-gray-800 border border-gray-300 pl-4  pr-10 py-3 rounded-lg outline-blue-600"}>
                                {init_time ?init_time: placeholder}
                            </div>
                        </div>

                    }
                />
            </div>
        </div>
    )
}

export default CommonTimePicker