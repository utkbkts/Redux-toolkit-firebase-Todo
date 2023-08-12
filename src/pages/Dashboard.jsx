import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import Todoform from '../components/Todoform'
import Spinner from "../components/Spinner"
import { getTodo,reset } from '../features/todo/Todoslice'
import Todo from '../components/Todo'
const Dashboard = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
const {user}=useSelector((state)=>state.auth)
const {todos,isLoading,isError,isSuccess,message}=useSelector((state)=>state.todos)

useEffect(()=>{
  if(!user){
    navigate("/login")
  }
  if(isError){

  }
  dispatch(getTodo())
  return()=>{
    if(user){
      dispatch(reset())
    }
  }
},[user,navigate,dispatch,isError,message])
if(isLoading){
  return <Spinner/>
}

  return (
    <div className='todokapsam'>
      <Todoform/>
    <div className='todolist'>
    {todos.length>0 ? (
      <div className='todos'>{todos.map((todo)=>(
        <Todo key={todo.id} t={todo}/>
      ))}</div>
     ):(
      <h3>Henüz todo yok</h3>
     )}
    </div>
    </div>
  )
}

export default Dashboard