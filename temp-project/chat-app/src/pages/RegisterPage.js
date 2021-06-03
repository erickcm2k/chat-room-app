import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../auth/AuthContext";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = ({ target }) => {
    console.log(form);
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const { email, password, name } = form;
    const ok = await register(name, email, password);
    console.log(ok);
    if (ok !== true) {
      Swal.fire("Error", ok, "error");
    }
  };

  const everyThingOk = () => {
    const { name, email, password } = form;
    const ok =
      email.length > 0 && password.length > 0 && name.length > 0 ? true : false;
    console.log(ok);
    return ok;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="login100-form validate-form flex-sb flex-w"
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          onChange={onChange}
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          onChange={onChange}
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          onChange={onChange}
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          disabled={!everyThingOk()}
          className="login100-form-btn"
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
