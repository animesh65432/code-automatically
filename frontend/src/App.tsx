import React from 'react'
import { Home } from "./pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}> </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App