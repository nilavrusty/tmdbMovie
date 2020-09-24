import React, { useState, useEffect } from 'react'
import { useAlert } from "react-alert";
import axios from 'axios'

import HorizontalContent from '../components/HorizontalContent'

import { domain, api_key } from '../utility'

// in memory cache
let totalMoviePages, totalTvPages, moviePage, tvPage = 1;


const MyRatings = ({ guestId }) => {

    const [movie, setMovie] = useState([]);
    const [message, setMessage] = useState('Titles you have rated would appear here below')
    const [tv, setTv] = useState([]);
    const [movieLoad, setMovieLoad] = useState(false);
    const [tvLoad, setTvLoad] = useState(false);

    const alert = useAlert()



    useEffect(() => {
        (async () => {

            if (guestId?.length) {
                try {
                    setMovieLoad(true)
                    setTvLoad(true)

                    const tvUrl = `${domain}guest_session/${guestId}/rated/tv${api_key}`;
                    const movieUrl = `${domain}guest_session/${guestId}/rated/movies${api_key}`;

                    const arr = [axios.get(`${movieUrl}&page=1`), axios.get(`${tvUrl}&page=1`)];
                    const data = await axios.all(arr);

                    //  set movie data 
                    moviePage = data[0].data.page;
                    totalMoviePages = data[0].data.total_pages
                    setMovie(data[0].data.results)
                    //  set tv data
                    tvPage = data[1].data.page;
                    totalTvPages = data[1].data.total_pages
                    setTv(data[1].data.results)
                    if (data[0].data.results.length === 0 && data[1].data.results.length === 0) {
                        setMessage(`You didn't rate any title yet `)
                    }
                    setMovieLoad(false)
                    setTvLoad(false)
                } catch (e) {
                    alert.error('Something went wrong!')
                    console.log(e.message)
                }
            }
        })()
    }, [guestId])

    const loadMore = async (type) => {

        const tvUrl = `${domain}guest_session/${guestId}/rated/tv${api_key}`;
        const movieUrl = `${domain}guest_session/${guestId}/rated/movies${api_key}`;

        if (Object.is(type, 'movie')) {
            moviePage++;
            if (moviePage <= totalMoviePages) {
                try {
                    setMovieLoad(true)
                    let newData = await axios.get(`${movieUrl}&page=${moviePage}`)
                    setMovie([...movie, ...newData.data.results])
                    setMovieLoad(false)
                } catch (e) {
                    alert.error('Something went wrong!')
                    console.log(e.message)
                }
            }
            return;
        }

        tvPage++;
        if (tvPage <= totalTvPages) {
            try {
                setTvLoad(true)
                let newData = await axios.get(`${tvUrl}&page=${tvPage}`)
                setTv([...tv, ...newData.data.results])
                setTvLoad(false)
            } catch (e) {
                alert.error('Something went wrong!')
                console.log(e.message)
            }
        }

    }


    return (
        < div >
            <p className="type-name">{message}</p>
            {movie.length ? <HorizontalContent data={movie} name="movie" loadMore={loadMore} loading={movieLoad} /> : null}
            <br />
            {tv.length ? <HorizontalContent data={tv} name="tv" loadMore={loadMore} loading={tvLoad} /> : null}
        </div >
    )
}

export default MyRatings;