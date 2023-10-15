import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './Project Components/HomePage'
import Navbar from './Project Components/NavLinks'
import CreateLogin from './Project Components/CreateLogin'
import CreateAccount from './Project Components/CreateAccount'
import RegistrationSuccessPage from './Project Components/RegistrationSuccessPage'
import VerifyEmailPage from './Project Components/VerifyEmail'

const WowProject = () => {
  return (
    <div>

    <Routes>
        <Route path = "/" element = {<div>
            <Navbar></Navbar >
            <Outlet></Outlet></div>}>
            <Route index element = {<HomePage></HomePage>}></Route>

              <Route path = "login" element = {<CreateLogin></CreateLogin>}></Route>
              <Route path = "register" element = {<CreateAccount></CreateAccount>}></Route>
              <Route path="registration-success" element={<RegistrationSuccessPage></RegistrationSuccessPage>} />
              <Route path="verify-email" element={<VerifyEmailPage />}querystring/>

            </Route>

        {/* </Route> */}
    </Routes>

    </div>
  )
}

export default WowProject