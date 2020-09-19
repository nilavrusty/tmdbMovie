import React from 'react';

const EachContent = ({ name }) => {
    return (
        name.length ? <span className='each-content'>{name}</span> : null
    )
}

export default EachContent;