import React, { useState } from 'react'

const RangeRating = ({ rate, load }) => {

    const [rating, setRating] = useState(1)

    return (
        <div className='range-wrapper'>

            <input onChange={(e) => { setRating(e.target.value) }} type="range" id="volume" name="volume" min="0" max="20" step="1" value={rating} />
            <span style={{ width: '1rem' }}>{rating / 2}</span>

            <button onClick={() => { rate(rating / 2) }} disabled={(parseInt(rating) === 0 || load) ? true : false} className='button-search' >Rate</button>
        </div>
    )
}

export default RangeRating;