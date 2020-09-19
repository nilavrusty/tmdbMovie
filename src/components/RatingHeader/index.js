import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const RatingHeader = () => {
    const location = useLocation()

    return (
        <div className='align-right'>
            {!location.pathname.includes('search') ? <Link to="/search"> <button className='button-search ' >Search</button></Link> : null}
            {!location.pathname.includes('my_ratings') ? <Link to="/my_ratings"><button className='button-search' >My Ratings</button></Link> : null}
        </div>)

}

export default RatingHeader