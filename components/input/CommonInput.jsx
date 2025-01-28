"use client"
import React, { useState } from 'react'
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

function CommonInput({
    value = "",
    onChange = () => { },
    name = "",
    type = "text",
    placeholder = "",
    required = false,
    label

}) {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label className="text-gray-800 text-sm mb-2 block">{label}</label>
            <div className="relative flex items-center">
                <input value={value} onChange={onChange} name={name}
                    type={type === 'password' && !showPassword ? 'password' : 'text'}
                    required={required}
                    placeholder={placeholder}
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 text-gray-600"
                    >
                        {showPassword ? <BiHide/> : <BiShow/>}
                    </button>
                )}

            </div>
        </div>
    )
}

export default CommonInput
