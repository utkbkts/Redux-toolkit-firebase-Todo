import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authslice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
//useselector ile state bilgilerine erişeceğiz
//usedispatch ile register metodunu çalıştırmak için
const Registerpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [FormData, setFormData] = useState({
    email: "",
    parola: "",
    kullaniciad: "",
    parolakontrol: "",
  });
  const { email, parola, kullaniciad, parolakontrol } = FormData;
  const handle = (e) => {
    e.preventDefault();

    if (parola !== parolakontrol) {
      toast.error("parolalar eşit değil")
    } else {
      const userData = { email, parola, kullaniciad };
      dispatch(register(userData));
    }
  };

  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (isError) {
      toast.error("parola güvenli değil", { position: "top-right" });
    }
    if(isSuccess || user){
      navigate("/")
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch]);


  if(isLoading){
      return  <Spinner/>
  }


  return (
    <div className="Login">
      <section>
        <h1>Üyelik oluştur</h1>
      </section>
      <section>
        <form action="#" onSubmit={handle} className="login-form">
          <div>
            <input
              type="text"
              name="kullaniciad"
              id="kullaniciad"
              value={kullaniciad}
              placeholder="Lütfen kullanıcı adınızı giriniz."
              onChange={onchange}
            />
          </div>
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
          <div>
            <input
              type="password"
              name="parolakontrol"
              id="parolakontrol"
              value={parolakontrol}
              placeholder="Lütfen parolanızı tekrar giriniz."
              onChange={onchange}
            />
          </div>
          <div className="button-login">
            <button type="submit">Üye ol</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Registerpage;
