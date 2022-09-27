import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../src/router";
import { render, screen } from "@testing-library/react";

describe('Pruebas en <PrivateRoute/>', () => {

    test('debe de mostrar el children sí esta autenticado', () => {

        Storage.prototype.setItem = jest.fn()

        const contextValue = {
            logged: true,
            user: {
                id: '1',
                name: 'Beto'
            }
        }
        const Children = () => { return <h1>Ruta Privada</h1> };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute >
                        <Children />
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    })
})