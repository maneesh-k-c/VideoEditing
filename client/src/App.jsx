import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Registration from './Registration'
import AddRequest from './user/AddRequest'
import MyMedia from './user/MyMedia'
import Profile from './Profile'
import Requests from './editor/Requests'
import MediaStatus from './user/MediaStatus'
import MyWorks from './editor/MyWorks'
import Chat from './Chat'
import About from './About'
import ManageMedia from './admin/ManageMedia'
import ManageClients from './admin/ManageClients'
import ManageEditor from './admin/ManageEditor'
import OutPut from './user/OutPut'
import SingleEditor from './user/SingleEditor'

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Registration/>}/>
    <Route path='/add-requests' element={<AddRequest/>}/>
    <Route path='/my-media' element={<MyMedia/>}/>
    <Route path='/my-media-status/:id' element={<MediaStatus/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/chat/:id' element={<Chat/>}/>
    <Route path='/single-editor/:id' element={<SingleEditor/>}/>

    {/* editor */}
    <Route path='/all-requests' element={<Requests/>}/>
    <Route path='/my-works' element={<MyWorks/>}/>

    {/* admin */}
    <Route path='/manage-media' element={<ManageMedia/>}/>
    <Route path='/manage-clients' element={<ManageClients/>}/>
    <Route path='/manage-editors' element={<ManageEditor/>}/>
    <Route path='/request/:id' element={<OutPut/>}/>
   
   </Routes>    
   </BrowserRouter>
  )
}

export default App
