import { types } from "../../../src/auth"

describe('Pruebas en types.js', () => {
    const initialValue = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    }
    test('debe de regresar estos types', () => {
        expect(types).toEqual(initialValue);
    })
})