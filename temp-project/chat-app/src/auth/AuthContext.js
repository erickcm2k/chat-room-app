import React, { createContext, useState, useCallback } from "react";
import { noTokenFetch, tokenFetch } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    const resp = await noTokenFetch("login", { email, password }, "POST");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;
      console.log(user);
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }

    return resp.ok;
  };

  const register = async (name, email, password) => {
    const resp = await noTokenFetch(
      "login/new",
      { name, email, password },
      "POST"
    );
    console.log(resp);
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      console.log(resp);
      const { user } = resp;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      console.log("Autenticado");
      return true;
    }

    return resp.msg;
  };

  const checkToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }

    const resp = await tokenFetch("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      console.log(resp);

      const { user } = resp;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      console.log("Autenticado");
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, checkToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
