import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
})
);

describe('Pruebas en <SearchPage/>', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot()
    })

    test('debe de mostrarse correctamente con valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman')
        const image = screen.getByRole('img');
        expect(image.src).toContain('batman')
        const searchMessage = screen.getByLabelText('alert-danger');
        expect(searchMessage.style.display).toBe('none')
    })

    test('debe de mostrar un error sí no encuentra un hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman123');
        const searchMessage = screen.getByLabelText('alert-danger');
        expect(searchMessage.style.display).not.toBe('none');
    })

    test('debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: inputValue } })
        fireEvent.submit(input);
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)
    })
})