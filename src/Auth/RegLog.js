import { useEffect, useState } from 'react';
import './RegLog.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegLog = ({ SetEmail }) => {
    const [Login, setLogin] = useState(true)
    const [emailError, setEmailError] = useState(false)
    const [Error, setError] = useState('')

    const [User, setUser] = useState({
        name: "",
        email: "",
        password: "",
        repassword: ""
    })
    const navigate = useNavigate()

    const LoginHandler = async () => {

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(User.email)) {
            setEmailError(true)
        }
        else {
            await axios.post('https://securelocker.onrender.com/locker/login', { User }).then((res) => {
                console.log(res.data)
                if (res.data == 'Success') {
                    SetEmail(User.email)
                    setUser({
                        name: "",
                        email: "",
                        password: "",
                        repassword: ""
                    })
                    navigate('/textMesage')
                } else {
                    setEmailError(false)
                    setError(res.data)
                }
            })
        }

    }
    const RegistraionHandler = async () => {

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(User.email)) {
            setEmailError(true)
        } else {
            if (User.password == User.repassword) {
                await axios.post('https://securelocker.onrender.com/locker/signup', { User }).then((res) => {
                    console.log(res.data)
                    if (res.data == 'Success') {
                        SetEmail(User.email)
                        setUser({
                            name: "",
                            email: "",
                            password: ""
                        })
                        navigate('/textMesage')
                    } else {
                        setEmailError(false)
                        setError(res.data)
                    }
                })

            } else {
                setEmailError(true)
            }
        }

    }
    const EmailChanger = (e) => {
        const { value } = e
        setUser({
            ...User,
            email: value
        })
    }
    const NameChanger = (e) => {
        const { value } = e
        setUser({
            ...User,
            name: value
        })
    }
    const PasswordChanger = (e) => {
        const { value } = e
        setUser({
            ...User,
            password: value
        })
    }
    const RePasswordChanger = (e) => {
        const { value } = e
        setUser({
            ...User,
            repassword: value
        })
    }

    return (
        <div>
            {
                Login ? (<section class="vh-100" >
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col col-xl-10">
                                <div class="card" >
                                    <div class="row g-0">
                                        <div class="col-md-6 col-lg-5 d-none d-md-block">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                                alt="login form" class="img-fluid" />
                                        </div>
                                        <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div class="card-body p-4 p-lg-5 text-black">

                                                <form>

                                                    <div class="d-flex align-items-center mb-3 pb-1">
                                                        <i class="fas fa-cubes fa-2x me-3" ></i>
                                                        <span class="h1 fw-bold mb-0">Locker</span>
                                                    </div>

                                                    <h5 class="fw-normal mb-3 pb-3" >Sign into your account</h5>

                                                    <div class="form-outline mb-4">
                                                        <input onChange={(e) => EmailChanger(e.target)} type="email" id="form2Example17" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form2Example17">Email address</label>
                                                    </div>
                                                    {
                                                        emailError ? <p className='text-danger'  > Please Enter Correct Email      </p> : null
                                                    }
                                                    <div class="form-outline mb-4">
                                                        <input onChange={(e) => PasswordChanger(e.target)} type="password" id="form2Example27" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form2Example27">Password</label>
                                                    </div>
                                                    <p className='text-danger'  > {Error}     </p>
                                                    <div class="pt-1 mb-4">
                                                        <button onClick={() => LoginHandler()} class="btn btn-dark btn-lg btn-block" type="button">Login</button>
                                                    </div>

                                                    <p class="mb-5 pb-lg-2">Don't have an account? <a onClick={() => {
                                                        setLogin(false)
                                                        setUser({
                                                            name: "",
                                                            email: "",
                                                            password: "",
                                                            repassword: ""
                                                        })
                                                        setError("")
                                                        setEmailError(false)

                                                    }} href="#!"
                                                    >Register here</a></p>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>) : (
                    <section class="vh-100 bg-image"
                    >
                        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                            <div class="container h-100">
                                <div class="row d-flex justify-content-center align-items-center h-100">
                                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                        <div class="card" >
                                            <div class="card-body p-5">
                                                <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                                                <form>
                                                    <div class="form-outline mb-4">
                                                        <input onChange={(e) => NameChanger(e.target)} type="text" id="form3Example1cg" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example1cg">Your Name</label>
                                                    </div>
                                                    <div class="form-outline mb-4">
                                                        <input onChange={(e) => EmailChanger(e.target)} type="email" id="form3Example3cg" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example3cg">Your Email</label>
                                                    </div>
                                                    {
                                                        emailError ? <p className='text-danger'  > Please Enter Correct Email  </p> : null
                                                    }
                                                    <div class="form-outline mb-4">
                                                        <input onChange={(e) => PasswordChanger(e.target)} type="password" id="form3Example4cg" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example4cg">Password</label>
                                                    </div>
                                                    <div class="form-outline mb-4">
                                                        <input onChange={(e) => RePasswordChanger(e.target)} type="password" id="form3Example4cdg" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                                                    </div>
                                                    <p className='text-danger'  > {Error}     </p>
                                                    <div class="form-check d-flex justify-content-center mb-5">
                                                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                                        <label class="form-check-label" for="form2Example3g">
                                                            I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                                                        </label>
                                                    </div>
                                                    <div class="d-flex justify-content-center">
                                                        <button type="button" onClick={() => RegistraionHandler()}
                                                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                                    </div>
                                                    <p class="text-center text-muted mt-5 mb-0">Have already an account? <a onClick={() => {
                                                        setLogin(true)
                                                        setUser({
                                                            name: "",
                                                            email: "",
                                                            password: "",
                                                            repassword: ""
                                                        })

                                                    }} href="#!"
                                                        class="fw-bold text-body"><u>Login here</u></a></p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>)
            }
        </div>
    );
};
export default RegLog;

