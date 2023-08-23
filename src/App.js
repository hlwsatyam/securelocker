import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TodoList from './Components/TodoList';
import { useEffect, useState } from 'react';

function App({ Email }) {
  const [ToDo, SetToDo] = useState([])
  const [curr, Setcurr] = useState('')
  const [blankcurr, setBlankCurr] = useState(false)
  const [emailIsPresent, setEmailIsPresent] = useState(true)
  const [changeForGetAll, SetchangeForGetAll] = useState(true)
  useEffect(() => {
    async function getData() {
      await axios.post("http://localhost:8000/text", { email: Email }).then((data) => {
        if (data.data == null) {
          alert("no text found")
        } else {
          SetToDo(data.data)
        }
      },)
    }
    getData()
  }, [changeForGetAll])

  function SubmitHandler() {

    async function getData() {

      if (Email == "") {
        return setEmailIsPresent(false)
      }

      if (curr == '') {
        return setBlankCurr(true)
      }

      await axios.post("http://localhost:8000/text/save", { text: curr, email: Email }).then((data) => {
        console.log(data.data)
        SetToDo(data.data)
      }
      )
    }
    setBlankCurr(false)
    getData()

    Setcurr("")
    if (changeForGetAll) {
      SetchangeForGetAll(false)
    } else {
      SetchangeForGetAll(true)
    }
  }


  const deleteOp = async (Email, id) => {

    if (Email == "") {
      return setEmailIsPresent(false)
    }

    await axios.post("http://localhost:8000/text/delete", { id: id, email: Email })
      .then((data) => {
        if (changeForGetAll) {
          SetchangeForGetAll(false)
        } else {
          SetchangeForGetAll(true)
        }
      })

  }
  const updateOp = async (Email, id) => {

    if (Email == "") {
      return setEmailIsPresent(false)
    }

    await axios.put("http://localhost:8000/text/update", { id: id, email: Email })
      .then((data) => {
        Setcurr(data.data)
        if (changeForGetAll) {
          SetchangeForGetAll(false)
        } else {
          SetchangeForGetAll(true)
        }
      })



  }


  return (
    <div className="App">
      <div className="container">

        {
          emailIsPresent ? null : <p className='h6 mt-1 p-1 text-danger border shadow' >Please Login!  <a href="http://localhost:3000/">Click Now</a>  !</p>
        }

        <div className="h1 text-danger  ">Secure Locker!</div>
        <div className="top">
          <input type="search" placeholder='Add Something...' name="" id="" value={curr} onChange={(e) => {
            Setcurr(e.target.value)
          }} />
          <div className="Add" onClick={() => SubmitHandler()}   >Add</div>
        </div>
        {
          blankcurr ? <p className='text-danger m-1 border shadow' >Please Enter Your Remember!</p> : null
        }
        <div className="list border mt-5 ">
          {
            ToDo.map((item) => <TodoList

              deleteOp={() => deleteOp(Email, item.id)}
              updateOp={() => updateOp(Email, item.id)}

              text={item.text} />)
          }
        </div>
      </div>
    </div>
  );
}
export default App;