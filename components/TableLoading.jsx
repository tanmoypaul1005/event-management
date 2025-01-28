import React from 'react'
import { RotatingLines } from "react-loader-spinner";
function TableLoading() {
    return (
        <tr className="container w-full h-[50vh]">
            <td className='' colSpan="6">
                <div className='flex justify-center items-center'>

                <RotatingLines
                    width="100"
                    strokeColor="#285D43"
                    strokeWidth={4}
                    strokeWidthSecondary={3}
                    />
                    </div>
            </td>
        </tr>


    )
}

export default TableLoading
