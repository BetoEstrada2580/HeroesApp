import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../types/types'
import React, { useReducer } from 'react'

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        logged: !!user,
        user,
    }
}
export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {}, init);
    const onLogin = async (name = '') => {
        const user = {
            id: '1',
            name
        }
        const action = {
            type: types.login,
            payload: user
        }
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(action);
    }
    const onLogout = async () => {
        const action = { type: types.logout }
        localStorage.removeItem('user');
        dispatch(action);
    }
    return (
        <AuthContext.Provider
            value={{
                ...state,
                // Methods
                login: onLogin,
                logout: onLogout
            }}>
            {children}
        </AuthContext.Provider>
    )
}
