import React, { useState } from 'react'
import RegLog from './Auth/RegLog'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TextMessage from './Components/Message/TextMessage'
import Home from './Components/Home/Home'
import Photos from './Components/Photos/Photos'
function CallingRouting() {
    const [Email, SetEmail] = useState(null)
    return (
        <div>
            <BrowserRouter>
                <Routes >
                    <Route exact path='/' element={<Home />} />

                    <Route path='/textMesage' element={Email ? <TextMessage Email={Email} /> : <RegLog path='/textMesage' SetEmail={SetEmail} />} />

                    <Route path='/photos' element={Email ? <Photos Email={Email} /> : <RegLog path='/photos' SetEmail={SetEmail} />} />               </Routes>
            </BrowserRouter>
        </div>
    )
}
export default CallingRouting