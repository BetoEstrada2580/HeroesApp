import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => {
    test('debe de retornar el estado por defecto', () => {
        const initialState = {
            logged: false
        }
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        const initialState = {
            logged: false
        }
        const user = {
            id: '1',
            name: 'Beto'
        }
        const action = {
            type: types.login,
            payload: user
        }
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(user);

    })

    test('debe de (logout) borrar el name del usuario y el logged en false', () => {
        const initialState = {
            logged: true,
            user: {
                id: '1',
                name: 'Beto'
            }
        }
        const action = {
            type: types.logout
        }
        const state = authReducer(initialState, action);
        expect(state.logged).toBeFalsy();

    })
})