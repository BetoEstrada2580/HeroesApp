import { AppRouter } from "../../src/router"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"

describe('Pruebas en <AppRouter/>', () => {
    test('debe de mostrar el login sí no esta autenticado', () => {
        const contextValue = {
            logged: false
        }
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getAllByText('Login').length).toBe(2);
    })

    test('debe de mostrar el componente de Marvel sí esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '1',
                name: 'Beto'
            }
        }
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText('Marvel Comics')).toBeTruthy()
    })
})