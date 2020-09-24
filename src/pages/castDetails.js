import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'

import axios from 'axios';

import { null_path, domain, api_key } from '../utility'

import DetailsRight from '../components/DetailsRight';
import HorizontalContent from '../components/HorizontalContent'

const CastDetails = (props) => {
    const [cast, setCast] = useState({});
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let castDetails = await axios.get(`${domain}person/${props.match.params.id}${api_key}`);
                let movieCredits = await axios.get(`${domain}person/${props.match.params.id}/movie_credits${api_key}`);
                let tvCredits = await axios.get(`${domain}person/${props.match.params.id}/tv_credits${api_key}`);

                setCast({ ...castDetails.data })

                setMovies([...movieCredits.data.cast])

                setTv([...tvCredits.data.cast])

            } catch (e) {
                console.log(e.message)
            }
        })()
    }, [])

    return (
        <div>
            <div className='flex'>
                <div>
                    <div className='details-left'>
                        <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : null_path} />
                    </div>
                </div>

                <DetailsRight details={cast} type="cast" cast={cast} />

            </div >
            <br />
            <br />
            {movies.length ? <HorizontalContent data={movies} name="movie" some={true} /> : null}
            <br />
            {tv.length ? <HorizontalContent data={tv} name="tv" some={true} /> : null}
        </div>

    )
}

export default withRouter(CastDetails)