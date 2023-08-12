import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authslice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onlogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div className="Container">
      <div className="left">
        <Link to="/">
          <h1>Yapılacaklar Uygulaması</h1>
        </Link>
      </div>
      <ul className="right-navbar">
        {user ? (
          <>
            <li>
              <span>Merhaba,{user.displayName}</span>
            </li>
            <li>
              <button onClick={onlogout} className="btn">
                <FaSignOutAlt />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <BiLogIn />
              <Link to="/login">Giriş yap</Link>
            </li>
            <li>
              <FaUserAlt />
              <Link to="/register">Üye ol</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
