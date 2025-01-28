import React from 'react'

function CancelButton({onClick}) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-all ease-in-out duration-300">
            Cancel
        </button>
    )
}

export default CancelButton
