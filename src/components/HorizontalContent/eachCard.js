import React, { memo } from 'react';
import { Link } from 'react-router-dom'

import { null_path } from '../../utility'


const EachCard = memo(({ poster, title, release, id, name, rating }) => {
    return (

        <div>
            <Link to={`/${name}_show/${id}`}>
                <div className='img-wrapper'>
                    <img loading="lazy" src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : null_path} alt="poster" />

                </div>
                <p className='entity-title' >{title}</p>
                {release ? <p className='entity-date'>{new Date(release).toDateString()}</p> : null}
                {rating ? <p className='entity-date'>You rated : {rating}/10</p> : null}
            </Link>
        </div>

    )
})

export default EachCard;