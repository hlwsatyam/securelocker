import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
function Home() {
    return (
        <div className='home' >
            <div className="innerDiv">
                <h1 className='text-center' >Welcome To Secure~Locker</h1>
                <h5 className='text-center' >online Locker</h5>
                <h5 className='text-center text-monospace mt-4' >

                    <Link className='text-decoration-none' data-toggle="tooltip" title="Your Text" to='/textMesage' >  Text  </Link>
                    <Link className='text-decoration-none' data-toggle="tooltip" title="Your Photos" to='/photos' >  Photo  </Link>
                    <Link className='text-decoration-none' data-toggle="tooltip" title="Your Videos" to='/textMesage' >  Video  </Link>
                    <Link className='text-decoration-none' data-toggle="tooltip" title="Your Audios" to='/textMesage' >  Audio  </Link>
                    <Link className='text-decoration-none' data-toggle="tooltip" title="Your Documents" to='/textMesage' >  Document  </Link>
                    <Link className='text-decoration-none' data-toggle="tooltip" title="Your Numbers" to='/textMesage' >  Number  </Link>

                </h5>
            </div>
        </div>
    )
}

export default Home