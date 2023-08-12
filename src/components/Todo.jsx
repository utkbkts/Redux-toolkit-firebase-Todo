import React from 'react'
import Todoslice,{deleteTodo} from '../features/todo/Todoslice'
import { useDispatch } from 'react-redux'
const Todo = ({t}) => {
    const dispatch = useDispatch()
  return (
    <div className='todos'>
    <div className='todolar'>{t.todo}</div>
    <button onClick={()=>dispatch(deleteTodo(t.id))} className='close'>Delete</button>
    </div>
  )
}

export default Todo