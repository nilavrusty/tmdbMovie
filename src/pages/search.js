import React, { useState, useEffect } from 'react'

import SearchInput from '../components/SearchInput'
import HorizontalContent from '../components/HorizontalContent'

import axios from 'axios'
import { useAlert } from "react-alert";
import { domain, api_key } from '../utility'


// in memory cache
let totalMoviePages, totalTvPages, moviePage, tvPage = 1;
let searchedValue = '';
let inMemoryCache = [];

const Search = ({ guestId }) => {

    const [movie, setMovie] = useState([]);
    const [message, setMessage] = useState('Your Search results would appear here below')
    const [tv, setTv] = useState([]);
    const [movieLoad, setMovieLoad] = useState(false);
    const [tvLoad, setTvLoad] = useState(false);

    const alert = useAlert()

    useEffect(() => {
        //   setting data from cache when you come back from details page
        if (inMemoryCache.length) {
            //  set movie data 
            moviePage = inMemoryCache[0].page;
            totalMoviePages = inMemoryCache[0].total_pages
            setMovie(inMemoryCache[0].results)
            //  set tv data
            tvPage = inMemoryCache[1].page;
            totalTvPages = inMemoryCache[1].total_pages
            setTv(inMemoryCache[1].results)
        }
    }, [])

    const searchClick = async (value) => {
        try {
            searchedValue = value;
            setMovieLoad(true)
            setTvLoad(true)
            // for 1st time we load two data parallely
            let arr = [axios.get(`${domain}search/movie${api_key}&query=${value}&page=1`), axios.get(`${domain}search/tv${api_key}&query=${value}&page=1`)]

            const data = await axios.all(arr);
            // caching 
            inMemoryCache = [data[0].data, data[1].data]
            //  set movie data 
            moviePage = data[0].data.page;
            totalMoviePages = data[0].data.total_pages
            setMovie(data[0].data.results)
            //  set tv data
            tvPage = data[1].data.page;
            totalTvPages = data[1].data.total_pages
            setTv(data[1].data.results)
            setMovieLoad(false)
            setTvLoad(false)
            if (data[0].data.results.length === 0 && data[1].data.results.length === 0) {
                setMessage(`No title found for "${searchedValue}"`)
            }
        } catch (e) {
            alert.error('Something went wrong!')
            console.log(e.message)
        }
    }


    const loadMore = async (type) => {
        if (Object.is(type, 'movie')) {
            moviePage++;
            if (moviePage <= totalMoviePages) {
                try {
                    setMovieLoad(true)
                    let newData = await axios.get(`${domain}search/movie${api_key}&query=${searchedValue}&page=${moviePage}`)
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
                let newData = await axios.get(`${domain}search/tv${api_key}&query=${searchedValue}&page=${tvPage}`)
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
            <p className='type-name'>Neelabh's TMDB Movie App</p>
            <SearchInput click={searchClick} loading={movieLoad || tvLoad} value={searchedValue} />
            {searchedValue.length && (movie.length || tv.length) ? <p className='type-name'>Search results for "{searchedValue}", Scroll to load more</p> : <p className="type-name">{message}</p>}
            {movie.length ? <HorizontalContent data={movie} name="movie" loadMore={loadMore} loading={movieLoad} /> : null}
            <br />
            {tv.length ? <HorizontalContent data={tv} name="tv" loadMore={loadMore} loading={tvLoad} /> : null}
        </div >
    )
}

export default Search;