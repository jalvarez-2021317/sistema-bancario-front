import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import { AuthContext } from "../../src/auth/context/AuthContext";
import { Navbar } from "../../src/ui";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

describe('Pruebas en el Navbar', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Vic',
            id: '123'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());

    test('debe mostrar el nombre que se esta logeado', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug();
        expect(screen.getByText('Vic')).toBeTruthy();


    });

    test('debe de llamar al logout y navigate cuando se hace click en el boton de logout', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {'replace': true});


    });



});