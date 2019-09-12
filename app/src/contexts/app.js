import React, { createContext, useReducer } from 'react'
import lodashGet from 'lodash.get'
import { useStatusBarHeight } from '../env/hooks/hookstatusbarheight'

//action
export const set_locale = "set_locale"

// reducer
const reducer = (state, action) => {
    const { type, payload } = action
    console.log('app action:', action)
    switch(type) {
        case set_locale:
            return {...state, locale: payload}
        default:
            return state  
    }
}

// context
export const AppContext = createContext({})
// context wrap
export const AppContextWrap = ({children}) => {
    const statusbarobj = useStatusBarHeight()

    const init = {
        statusbar: lodashGet(statusbarobj, 'data.statusBarHeight', 22),
        locale: 'zh-cn'
    }

    const [ app, dispatch ] = useReducer(reducer, init)

    return (
        <AppContext.Provider value={{app, dispatch}}>{children}</AppContext.Provider>
    )
}