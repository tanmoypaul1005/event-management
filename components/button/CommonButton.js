import React from 'react'

function CommonButton({title,onClick,type="button"}) {
    return (
        <button onClick={onClick} type={type}
            className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600
            ">{title}
        </button>
    )
}

export default CommonButton
