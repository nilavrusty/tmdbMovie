import React from 'react';
import EachCard from './eachCard'
import { OnlyPulse } from '../Pulse/index'

import { throttleFunction } from '../../utility'

var x;

const HorizontalContent = ({ data, name, loadMore, loading, some }) => {

    const scrollX = e => {
        x = e.target;
        throttleFunction(() => {
            if (x.scrollWidth - x.offsetWidth <= x.scrollLeft) {
                loadMore(name)
            }
        })

    }

    if (some) {
        return (
            <div
                className={`${name}-horizontal-wrapper `}
            >
                {data.map((v, i) =>
                    <EachCard rating={v?.rating} key={i} id={v.id} name={name} poster={v.poster_path} title={v.title || v.name} release={v.release_date || v.first_air_date} />
                )}

            </div>
        )
    }

    return (
        <div>
            <div className='type-name marginBottom'>{name}
                {loading ? <OnlyPulse /> : null}
            </div>
            <div
                onScroll={scrollX}
                className={`${name}-horizontal-wrapper `}
            >
                {data.map((v, i) =>
                    <EachCard rating={v?.rating} key={i} id={v.id} name={name} poster={v.poster_path} title={v.title || v.name} release={v.release_date || v.first_air_date} />
                )}

            </div>
        </div>
    )
}

export default HorizontalContent;