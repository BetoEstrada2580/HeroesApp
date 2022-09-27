import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { HeroPage, MarvelPage } from "../../../src/heroes"

describe('Pruebas de <HeroPage/>', () => {
    test('debe de mostrar la tarjeta del heroe (batman)', () => {
        render(
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Routes>
                    <Route path='hero/:id' element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Batman')).toBeTruthy();
    });

    test('debe de mostrar la tarjeta del heroe (batman)', () => {
        render(
            <MemoryRouter initialEntries={['/hero/dc-batman123']}>
                <Routes>
                    <Route path='hero/:id' element={<HeroPage />} />
                    <Route path='marvel' element={<h1>Página Marvel</h1>} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });


})