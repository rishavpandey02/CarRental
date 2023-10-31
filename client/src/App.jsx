import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import { Header } from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreatingListing from './pages/CreatingListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/listing'


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signUp" element={<SignUp />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/listing/:listingId" element={<Listing />}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create-listing" element={<CreatingListing />}/>
      <Route path='/update-listing/:listingId' element={<UpdateListing />} />  
    </Route>
    </Routes>
    </BrowserRouter>
  )
}
