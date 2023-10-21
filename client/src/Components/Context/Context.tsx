import React, { createContext } from "react";

export interface ILogged {
  logged: string;
  setLogged: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<ILogged | null>(null);
