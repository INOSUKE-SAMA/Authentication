import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './components/signIn' //case sensitive
import SignUp from './components/signUp'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Welcome to Home page</h1>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App