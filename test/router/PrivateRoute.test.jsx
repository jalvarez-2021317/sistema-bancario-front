import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Pruebas en el Private Route', () => { 

    test('si esta auth, debe de mostrar el children', () => { 

        //local storage
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Juan Carlos'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>

                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>

              
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta privada')).toBeTruthy();

        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');

    });

});