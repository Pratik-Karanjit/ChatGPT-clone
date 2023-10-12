import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './Project Components/HomePage'

const WowProject = () => {
  return (
    <div>

    <Routes>
        <Route path = "/" element = {<div>
            {/* <NavBar></NavBar> */}
            <Outlet></Outlet></div>}>
            <Route index element = {<HomePage></HomePage>}></Route>

                {/* hi */}
              {/* <Route path = "create" element = {<CreateAccount></CreateAccount>}></Route> */}

            </Route>

        {/* </Route> */}
    </Routes>

    </div>
  )
}

export default WowProject