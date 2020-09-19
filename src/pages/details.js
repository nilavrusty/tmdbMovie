import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import { useAlert } from "react-alert";

import DetailsRight from '../components/DetailsRight';
import { PulseWholePage } from '../components/Pulse/index'
import RangeRating from '../components/RangeRating'
import { null_path, domain, api_key } from '../utility'



const Details = (props) => {

    const [details, setDetails] = useState({});
    const [type, setType] = useState('');
    const [load, setLoad] = useState(true)
    const [rateLoad, setRateLoad] = useState(false)
    const alert = useAlert()

    useEffect(() => {
        (async () => {
            let type = props.match.url.split('/')[1].split('_')[0]
            setType(type)
            let id = props.match.params.id
            try {
                let data = await axios.get(`${domain}${type}/${id}${api_key}`)
                if (Object.keys(data.data).length) {
                    setDetails({ ...data.data })
                }
                setLoad(false)
            } catch (e) {
                alert.error('Something went wrong!')
                console.log(e.message)
                setLoad(false)
            }
        })()
    }, [])

    const rate = async (val) => {
        try {
            setRateLoad(true)
            const id = props.match.params.id
            await axios.post(`${domain}${type}/${id}/rating${api_key}&guest_session_id=${props.guestId}`, {
                value: val
            })
            alert.success(<p style={{ textTransform: 'capitalize' }}>Your rated this {type === 'movie' ? 'Movie' : 'Tv Show'}, you can now go to ratings page to check it out</p>)
            setRateLoad(false)

        } catch (e) {
            alert.error("Something went wrong!");
            setRateLoad(false)
            console.log(e.message)
        }
    }

    const upcomming = () => {
        return new Date().getTime() < new Date(details.release_date || details.first_air_date).getTime() ? true : false;
    }

    if (load) {
        return <PulseWholePage />
    }

    return (
        <div className='flex'>
            <div>
                <div className='details-left'>
                    <img src={details.poster_path ? `https://image.tmdb.org/t/p/w500/${details.poster_path}` : null_path} />
                </div>
                {/* for upcomming movies ratings are not accepted by API so not showing the range bar */}
                {upcomming() ? null : <RangeRating load={rateLoad} rate={rate} />}
            </div>

            <DetailsRight details={details} type={type} />

        </div >
    )
}

export default withRouter(Details) 