import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en el app router', () => {

    test('debe de mostrar el login si no esta auth', () => {

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>

                <AuthContext.Provider value={{ contextValue }}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getAllByText('Login').length).toBe(2);

    });


    test('debe mostrar el componente de marvel si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: '1234',
                name: 'Cristian'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={{ contextValue }}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);

    });


});