import {createContext} from "react";

function noop () {}

export const AuthContext = createContext({
   user: null,
   login: noop,
   logout: noop
})