import React, { useState } from 'react'
import RegLog from './Auth/RegLog'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function CallingRouting() {
 const   [Email, SetEmail] = useState("")
    return (
        <div>
            <BrowserRouter>
                <Routes >
                    <Route path='/' element={<RegLog SetEmail={SetEmail} />} />
                    <Route path='/textMesage' element={<App Email={Email} />} />
                </Routes>
            </BrowserRouter >
        </div>
    )
}
export default CallingRouting