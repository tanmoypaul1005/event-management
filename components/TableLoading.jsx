
import React from 'react'
import { ImSpinner3 } from 'react-icons/im'

function TableLoading() {
    return (
        <tr className="container w-full h-[50vh]">
            <td className='' colSpan="6">
                <div className='flex justify-center items-center'>
                    <ImSpinner3 className=" flex justify-center items-center w-[150px] h-[150px] mt-[2px] animate-spin" />
                </div>
            </td>
        </tr>


    )
}

export default TableLoading
