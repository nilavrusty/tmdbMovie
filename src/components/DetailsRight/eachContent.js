import React from 'react';
import { Link } from 'react-router-dom';

const EachContent = ({ name, id }) => {
    if (id) {
        return (
            name.length ? <Link to={`/cast_details/${id}`}><span className='each-content'>{name}</span></Link> : null
        )
    }
    return (
        name.length ? <span className='each-content'>{name}</span> : null
    )
}

export default EachContent;