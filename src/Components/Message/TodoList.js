import React from 'react'
import './Message.css';
function TodoList({ text, deleteOp, updateOp}) {

    return (
        <div>
            <div className="todo">
                <div className="text">
                    {text}
                </div>
                <div className="icons">
                    <i onClick={deleteOp} className=' mx-2 fa fa-trash'></i>
                    <i onClick={updateOp} className="fa mx-2 fa fa-edit "></i>
                </div>
            </div>
        </div>
    )
}
export default TodoList