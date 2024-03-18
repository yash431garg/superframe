import React, { useState, useEffect, FC } from 'react';

interface CopyclipProps {
    id: string;
}

const Copyclip: FC<CopyclipProps> = ({ id }) => {
    const [showTooltip, setShowTooltip] = useState('');
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL
    return (
        <div onClick={() => {
            navigator.clipboard.writeText(NEXT_PUBLIC_URL + '/frames/' + id)
            setShowTooltip(id)
            setTimeout(() => setShowTooltip(''), 1000);
        }} className="shareicon" >
            <p className='cursor-pointer'>📃 Copy to clipboar</p>
            {showTooltip === id && <span className="tooltip">Happy Casting!</span>}
        </div>
    )
}

export default Copyclip