import React from 'react'
import './Photos.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import PhotosList from './PhotosList';
function Photos({ Email }) {
    const [ToDo, SetToDo] = useState([])
    const [curr, Setcurr] = useState('')
    const [blankcurr, setBlankCurr] = useState(false)
    const [emailIsPresent, setEmailIsPresent] = useState(true)
    const [changeForGetAll, SetchangeForGetAll] = useState(true)



    const SubmitHandler = () => {
        if (Email == "") {
            return setEmailIsPresent(false)
        }
        if (curr == '') {
            return setBlankCurr(true)
        }

    }

    const deleteOp = () => {

    }

    const updateOp = () => {

    }

    return (
        <div>

            <div className="App">
                <div className="container">

                    {
                        emailIsPresent ? null : <p className='h6 mt-1 p-1 text-danger border shadow' >Please Login!  <a href="https://securelocker.vercel.app/">Click Now</a>  !</p>
                    }

                    <Link className='text-decoration-none' to="/"> <div className="h1 text-danger  ">Secure Locker!</div></Link>
                    <div className="top m-3 ">
                        <input className='border m-auto text-danger shadow ' type="file" placeholder='Add Something...' name="" id="" value={curr} onChange={(e) => {
                            Setcurr(e.target.value)
                        }} />

                    </div>

                    {
                        blankcurr ? <p className='text-danger m-auto w-50 border shadow' >Please Select Your Memories!</p> : null
                    }

                    <div className="Add mt-3 " onClick={() => SubmitHandler()}   >Add</div>

                    <div className="list border mt-5 ">
                        {
                            ToDo.map((item) => <PhotosList
                  
                                deleteOp={() => deleteOp(Email, item.id)}
                                updateOp={() => updateOp(Email, item.id)}

                                text={item.text} />)
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Photos