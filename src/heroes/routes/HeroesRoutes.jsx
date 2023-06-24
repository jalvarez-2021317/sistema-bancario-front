import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui";
import { DcPage, HeroPage, MarvelPage, SearchPage } from "../pages";
import { AdminPage } from "../pages/AdminPage";
import { UserPage } from "../pages/UserPage";

export const HeroesRoutes = () => {

    const rol = JSON.parse(localStorage.getItem('rol'));

    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="marvel" element={<MarvelPage />} />
                    <Route path="dc" element={<DcPage />} />

                    {/* Rutas de Admin */}
                    <Route path="admin" 
                           element={ 
                                    (rol === 'ADMIN_ROLE') ?   
                                                            <AdminPage /> 
                                                            :
                                                             <Navigate to='/search' />
                        
                                } 
                    />


                    <Route path="search" element={<SearchPage />} />
                    <Route path="hero/:id" element={<HeroPage />} />

                    {/* Rutas de User */}
                    <Route path="user" 
                            element={ 
                                    ( rol === 'USER_ROLE') ?
                                                            <UserPage />
                                                            :
                                                            <Navigate to='/search' /> 
                            } 
                    />

                    {/* Search, Hero by ID */}
                    <Route path="/" element={<Navigate to="/marvel" />} />
                </Routes>
            </div>
        </>
    )
}