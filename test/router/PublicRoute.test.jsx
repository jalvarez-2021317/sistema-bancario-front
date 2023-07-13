import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";

describe('Pruebas en public Router', () => { 

    test('si no esta auth, debe de mostrar el children', () => { 

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta pública')).toBeTruthy();

    });


    test('debe de navegar si esta authenticado', () => { 

        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>

                <MemoryRouter initialEntries={['/login']}>

                    <Routes>

                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        }></Route>

                        <Route path="marvel" element={<h1>Pagina Marvel</h1>}></Route>

                    </Routes>

                </MemoryRouter>
                
            </AuthContext.Provider>
        );

        
        expect(screen.getByText('Pagina Marvel')).toBeTruthy();

                        
    });


});