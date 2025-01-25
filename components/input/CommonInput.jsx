import React from 'react'

function CommonInput({
    value = "",
    onChange = () => { },
    name = "",
    type = "text",
    placeholder = "",
    required = false,
    icon = "",
    label

}) {
    return (
        <div>
            <label className="text-gray-800 text-sm mb-2 block">{label}</label>
            <div className="relative flex items-center">
                <input value={value} onChange={onChange} name={name}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" />
                {icon}
            </div>
        </div>
    )
}

export default CommonInput
