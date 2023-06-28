import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { apiLogin } from "../api/apiAuthUser";
import './LoginPage.css';

export const LoginPage = () => {
  const { userName, password, onInputChange, onResetForm } = useForm({
    userName: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";
    login("Victor Cancinos");
    navigate(lastPath, {
      replace: true,
    });
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    const result = await apiLogin(userName, password);
    if (result === false) return null;

    const lastPath = localStorage.getItem("lastPath") || "/";
    login(result.data.nombre, result.data.rol);
    navigate(lastPath, {
      replace: true,
    });
    onResetForm();
  };

  return (
    <>
      <div className="containerjuanon mt-5">
        <h1>Login</h1>
        <hr />
        <form onSubmit={onSubmitLogin}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="userName"
              className="form-control"
              aria-describedby="userNameHelp"
              name="userName"
              value={userName}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          
        </form>
      </div>
    </>
  );
};