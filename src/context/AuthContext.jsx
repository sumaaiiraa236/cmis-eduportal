import React, { createContext, useState } from 'react';
export const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const setAuth = (userObj, token) => {
    setUser(userObj);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user');
  }

  return <AuthContext.Provider value={{ user, setAuth, logout }}>{children}</AuthContext.Provider>;
}
