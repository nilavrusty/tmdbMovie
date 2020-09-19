import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Search from './pages/search'
import Details from './pages/details'
import MyRatings from './pages/myratings'
import Header from './components/RatingHeader'


import { getGuestandStore } from './utility'




function App() {
  const [guestId, setGuestId] = useState('')

  useEffect(() => {
    (async () => {
      const guestDetails = localStorage.getItem('guest')
      if (!guestDetails) {
        const { guest_session_id } = await getGuestandStore()
        setGuestId(guest_session_id)
      }
      else {
        const { guest_session_id } = JSON.parse(guestDetails)
        setGuestId(guest_session_id)
      }
    })()

  }, [])

  return (
    <div className="App">

      <div className="App-header">
        <div className='App-container'>
          <BrowserRouter>

            <Header />

            <div >
              {window.location.pathname === "/" ? <Redirect from="/" to="/search" /> : <Redirect to={window.location.pathname} />}
              <Route exact path={"/search"}  >
                <Search guestId={guestId} />
              </Route>
              <Route exact path={"/movie_show/:id"}  >
                <Details guestId={guestId} />
              </Route>
              <Route exact path={"/tv_show/:id"}  >
                <Details guestId={guestId} />
              </Route>
              <Route exact path="/my_ratings">
                <MyRatings guestId={guestId} />
              </Route>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
