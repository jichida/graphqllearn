import React, { createContext, useReducer } from 'react'
import config from '../env/config'

// init 
const init = {
    loginflag:-1,
    loginsuccess:false,
    userid:'',
    token:'',
}

//action
export const login = 'login'
export const logout = 'logout'

// reducer
const reducer = (state, action) => {
    const { type, payload } = action

    switch(type) {
        case login:
            return { ...state, ...payload, loginsuccess:true, loginflag:1 }
        case logout:
            localStorage.removeItem(`react_${config.softmode}_token`)
            return { ...init, loginflag: 0}
        default:
            return state  
    }
}

// context
export const UserloginContext = createContext({})
// context wrap
export const UserloginContextWrap = ({children}) => {
    const [ userlogin, dispatch ] = useReducer(reducer, init)

    return (
        <UserloginContext.Provider value={{userlogin, dispatch}}>{children}</UserloginContext.Provider>
    )
}