import React, { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import {login,reset} from "../features/auth/authslice"
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"
const Loginpage = () => {
  const [FormData, setFormData] = useState({
    email: "",
    parola: "",
  });
  const navigate= useNavigate()
  const dispatch=useDispatch()
  const {user,isLoading,isError,isSuccess,message}= useSelector((state)=>state.auth)
  const { email, parola } = FormData;

  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handle = (e) => {
    e.preventDefault();

    const userData={email,parola}
    dispatch(login(userData))
  };

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate("/")
    }
    dispatch(reset())
    if(isLoading){
      return <Spinner/>
    }
  },[user,isError,isSuccess,message,navigate,dispatch])

  return (
    <div className="Login">
      <section>
        <h1>Giriş</h1>
      </section>
      <section>
        <form action="#" onSubmit={handle} className="login-form">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Lütfen Email hesabınızı giriniz."
              onChange={onchange}
            />
          </div>
          <div>
            <input
              type="password"
              name="parola"
              id="password"
              value={parola}
              placeholder="Lütfen parolanızı giriniz."
              onChange={onchange}
            />
          </div>
          <div className="button-login">
            <button type="submit">Giriş</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Loginpage;
