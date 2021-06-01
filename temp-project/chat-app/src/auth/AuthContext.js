import React, { createContext, useState, useCallback } from "react";
import { noTokenFetch } from "../helpers/fetch";

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
      console.log(resp);
      const { uid, name, email } = resp;
      setAuth({
        uid,
        checking: false,
        logged: true,
        name,
        email,
      });
    }

    return resp.ok;
  };

  const register = (name, email, password) => {};

  const checkToken = useCallback(() => {}, []);

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ auth, login, register, checkToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
