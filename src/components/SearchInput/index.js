import React, { useState, useRef } from 'react'

const SearchInput = ({ click, loading, value }) => {
    const [search, setSearch] = useState(value)

    const btnRef = useRef(null)

    const searchClick = () => click(search);
    const changeSearchInput = (e) => setSearch(e.target.value);
    const keyPress = (e) => { if (e.key === 'Enter') { btnRef.current.click() } }


    return (
        <div className='flex search-input'>
            <input onKeyPress={keyPress} type="text" value={search} placeholder='Search here and press Enter key, type at least 3 characters' onChange={changeSearchInput} />
            <button disabled={loading || search.length <= 2} ref={btnRef} className='button-search' onClick={searchClick}>Search</button>
        </div>
    )
}

export default SearchInput;

