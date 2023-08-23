import React from 'react'
import './Photos.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import PhotosList from './PhotosList';
function Photos({ Email }) {
    const [ToDo, SetToDo] = useState([])
    const [blankcurr, setBlankCurr] = useState(false)
    const [changeForGetAll, SetchangeForGetAll] = useState(true)

    const [file, setFile] = useState(null);
    const [photos, setPhotos] = useState([]);


    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };


    const SubmitHandler = async () => {

        if (file == null) {
            return setBlankCurr(true)
        }

        const formData = new FormData();
        formData.append('photo', file);

        await axios.post('https://securelocker.onrender.com/photo/Photosave', formData)
            .then(response => {
                setPhotos([...photos, response.data]);
                setFile(null);
            })

    }

    const deleteOp = () => {

    }

    const updateOp = () => {

    }

    return (
        <div>

            <div className="App">
                <div className="container">

                    <Link className='text-decoration-none' to="/"> <div className="h1 text-danger  ">Secure Locker!</div></Link>
                    <div className="top m-3 ">
                        <input className='border m-auto text-danger shadow ' type="file" placeholder='Add Something...' name="" id="" onChange={(e) => {
                            handleFileChange(e)
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