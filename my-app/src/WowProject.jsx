import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './Project Components/HomePage'
import Navbar from './Project Components/NavlLinks'

const WowProject = () => {
  return (
    <div>

    <Routes>
        <Route path = "/" element = {<div>
            <Navbar></Navbar >
            <Outlet></Outlet></div>}>
            <Route index element = {<HomePage></HomePage>}></Route>

              {/* <Route path = "create" element = {<CreateAccount></CreateAccount>}></Route> */}

            </Route>

        {/* </Route> */}
    </Routes>

    </div>
  )
}

export default WowProject