// import { useState } from 'react'
import './App.css'
import {Bio, Nav, Gallery } from "./components"



function App() {

  return (
    <>
      <Nav />
      
      <div className="container">

      <Bio />
      <Gallery />
      
    </div>
    </>
  )
}

export default App
