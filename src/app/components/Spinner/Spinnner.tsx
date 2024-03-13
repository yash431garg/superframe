import React from 'react'
import className from './spinner.module.css'

function Spinnner() {
    return (
        <div className={`${className.loader} mt-10 mx-auto`}></div>
    )
}

export default Spinnner