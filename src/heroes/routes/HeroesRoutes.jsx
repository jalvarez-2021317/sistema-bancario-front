import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui";

import { AdminPage } from "../pages/AdminPage";
import { UserPage } from "../pages/UserPage";
import { UsersA } from "../pages/UsersA";

export const HeroesRoutes = () => {

    const rol = JSON.parse(localStorage.getItem('rol'));

    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>


                    {/* Rutas de Admin */}
                    <Route path="admin"
                        element={
                            (rol === 'ADMIN_ROLE') ?
                                <AdminPage />
                                :
                                <Navigate to='/search' />

                        }
                    />

                    <Route path="usersA"
                        element={
                            (rol === 'ADMIN_ROLE') ?
                                <UsersA/>
                                :
                                <Navigate to='/search' />

                        }
                    />




                    {/* Rutas de User */}
                    <Route path="user"
                        element={
                            (rol === 'USER_ROL') ?
                                <UserPage />
                                :
                                <Navigate to='/search' />
                        }
                    />

                    {/* Search, Hero by ID */}

                </Routes>
            </div>
        </>
    )
}