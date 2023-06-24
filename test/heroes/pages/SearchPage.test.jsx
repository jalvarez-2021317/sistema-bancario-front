import { fireEvent, render, screen } from "@testing-library/react";
import { Form, MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    mockUseNavigate: () => mockUseNavigate
}));

describe('Pruebas en SearchPage', () => {


    beforeEach( () => jest.clearAllMocks() );


    test('debede mostrarse correctamente con valores por default', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();


    });


    test('debede mostrar a batman y el input con el query-string', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');

        // screen.debug();


    });


    test('debe de mostrar un error si no se encuentra al hero (batman123) ', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('');

    });


    test('debe de llamar al navigate a la pantalla nueva', () => { 

        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText', value: inputValue}});

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

    });


});