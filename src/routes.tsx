import { Routes, Route } from 'react-router-dom';
import Authcomp from './Lock/Authcomp.tsx'
import Details from './Lock/Details.tsx'

import Addfriend from './Component/Addfriend.tsx'
import Friendprofile from './Component/Friendprofile.tsx'

import Home from './Component/Home.tsx'
import Setting from './Component/Setting.tsx'
export default function Approutes(){
  return(
    <>
    <Routes>
  <Route path="/Add/:friendId?" element={<Home />} />
 <Route path="/" element={<Authcomp />} />
  <Route path="/Settings" element={<Setting />} />
  <Route path="/Addfriend" element={<Addfriend />} />
  <Route path="/About" element={<Friendprofile />} />
  <Route path="/details" element={<Details />} />

    </Routes>
    </>
    )
}