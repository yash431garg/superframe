import React from 'react'
import className from './Footer.module.css'

function Footer() {
    return (
        <div className='text-center'>
            <hr className="h-px my-2 w-8/12 mx-auto bg-gray-200 border-0 dark:bg-[#313131]" />
            <p className="my-4">
                Warpcast builder @2024
            </p>
        </div>
    )
}

export default Footer