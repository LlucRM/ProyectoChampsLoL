import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = Cookies.get("user");

    if (savedUser) {
      try {
        // Si la cookie existe, la parseamos
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser); // Establecemos el usuario
      } catch (error) {
        console.error("Error al parsear la cookie:", error);
        setUser(null); // Si hubo error al parsear, no establecemos un usuario
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Si hay un usuario, lo guardamos en la cookie
      Cookies.set("user", JSON.stringify(user));
    } else {
      // Si no hay usuario, eliminamos la cookie
      Cookies.remove("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
