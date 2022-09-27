import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AuthContext } from "../../src/auth/context"
import { PublicRoute } from "../../src/router/PublicRoute"

describe('Pruebas de <PublicRoute/>', () => {

    test('debe de mostrar el children si no esta autenticado', () => {
        const contextValue = {
            logged: false
        }
        const Children = () => { return <h1>Ruta Publica</h1> };
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute >
                    <Children />
                </PublicRoute>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Ruta Publica')).toBeTruthy()
    })

    test('debe de navegar sí esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '1',
                name: 'Username'
            }
        }
        const Children = () => { return <h1>Ruta Publica</h1> };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute >
                                <Children />
                            </PublicRoute>
                        } />
                        <Route path="marvel"
                            element={<h1>Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Marvel')).toBeTruthy();
    })
})