import React from 'react';
import EachContent from './eachContent'

const DetailsRight = ({ details, type }) => {
    return (
        <div className='right-wrapper'>
            <p className=' title'>{details.original_title || details.name}</p>
            <p className=' overview' >{details.overview}</p>
            <p >{type === 'movie' ? 'Release' : 'First Aired'} : {new Date(details.release_date || details.first_air_date).toDateString()}</p>
            {details?.spoken_languages?.length ? <p >Languages : <br />{details.spoken_languages.map((v, i) => <EachContent key={i} name={v.name} />)}</p> : null}
            {details?.genres?.length ? <p >Genres : <br /> {details.genres.map((v, i) => <EachContent key={i} name={v.name} />)}</p> : null}
            {details?.production_countries?.length ? <p >Countries :<br /> {details.production_countries.map((v, i) => <EachContent key={i} name={v.name} />)}</p> : null}
            <p >Vote Average : {details.vote_average}/10</p>
            <p >Vote Count : {details.vote_count}</p>
            {type === 'movie' ? <p className='details-p'>Runtime : {details.runtime} minutes</p> : null}

        </div>
    )
}

export default DetailsRight