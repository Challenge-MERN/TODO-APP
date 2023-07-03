import { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { PATHS } from '../../const/Paths';

export const Navigation = () => {

    const routes = [
        {
            path: PATHS.HOME,
            name: 'Home'
        },
        {
            path: PATHS.PENDING_TASKS,
            name: 'Tareas Pendientes'
        },
        {
            path: PATHS.COMPLETED_TASKS,
            name: 'Tareas Completadas'
        },
        {
            path: PATHS.CREATE_TASK,
            name: 'Nueva Tarea'
        },
        {
            path: PATHS.SETTINGS,
            name: 'Configuración'
        },

    ]

    const AppName = 'Pendiente';

    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleOffcanvasToggle = () => {
        setIsOffcanvasOpen((prevState) => !prevState);
    };

    const handleOffcanvasClose = () => {
        setIsOffcanvasOpen(false);
    };

    const logOut = () => {
        // Lógica para cerrar sesión
    };

    return (
        <>
            <div className="d-flex justify-content-start" style={{ minHeight: '100vh' }}>
                <div id="slideBar">
                    <div className="d-flex flex-column flex-shrink-0 p-3 text-white h-100" id="menu">
                        <p className="text-center w-100 mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-4">{AppName}</span>
                        </p>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            {routes.map((route, index) => (
                                <li key={index}>
                                    <Link to={route.path} className="nav-link" aria-current="page" >{route.name}</Link>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <div className="dropdown">
                            <a
                                href="#"
                                className="d-flex align-items-center justify-content-evenly text-decoration-none dropdown-toggle"
                                id="dropdownUser1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i style={{ fontSize: '32px' }} className="bi bi-person-circle"></i>
                                <strong>USER NAME</strong>
                                {/* <strong>{this.userData.Alias}</strong> */}
                            </a>
                            <ul className="dropdown-menu shadow" id="options" aria-labelledby="dropdownUser1">
                                <li>
                                    Nueva Tarea
                                    {/* <Link to="/Components/tareas" className="dropdown-item">
                                        Nueva Tarea
                                    </Link> */}
                                </li>
                                <li>
                                    Configuración
                                    {/* <Link to="/Components/configuracion" className="dropdown-item">
                                        Configuración
                                    </Link> */}
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item" onClick={logOut}>
                                        Cerrar Sesión
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="topBar">
                    <nav className="navbar navbar-dark" id="menu2">
                        <div className="container-fluid">
                            <div className="d-flex w-100 flex-row-reverse justify-content-between">
                                <p className="w-100 text-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                    <span className="fs-4 pe-3">{AppName}</span>
                                </p>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    id="buttonTagg"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasDarkNavbar"
                                    aria-controls="offcanvasDarkNavbar"
                                    onClick={handleOffcanvasToggle}
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </div>
                    </nav>

                    <div
                        className={`offcanvas offcanvas-start w-100 ${isOffcanvasOpen ? 'show' : ''}`}
                        tabIndex={-1}
                        id="offcanvasDarkNavbar"
                        aria-labelledby="offcanvasDarkNavbarLabel"
                        style={{ backgroundColor: 'rgb(118, 33, 33)' }}
                    >
                        <div className="offcanvas-header text-center">
                            <div className="w-100 mb-1 mb-md-0 me-md-auto text-white text-decoration-none">
                                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">{AppName}</h5>
                            </div>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleOffcanvasClose}></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav fs-5 justify-content-end flex-grow-1">
                                <li className="nav-item" data-bs-dismiss="offcanvas" >
                                    Home
                                    {/* <Link to="/Components/tareas-pendientes" className="nav-link" aria-current="page">
                                        <i className="bi bi-house"></i>
                                        Home
                                    </Link> */}
                                </li>
                                <li data-bs-dismiss="offcanvas" className="nav-link">
                                    Tareas Pendientes
                                    {/* <Link to="/Components/tareas-pendientes" className="nav-link">
                                        <i className="bi bi-list-ol"></i>
                                        Tareas Pendientes
                                    </Link> */}
                                </li>
                                <li data-bs-dismiss="offcanvas" className="nav-link">
                                    Tareas Completadas
                                    {/* <Link to="/Components/tareas-completadas" className="nav-link">
                                        <i className="bi bi-list-check"></i>
                                        Tareas Completadas
                                    </Link> */}
                                </li>
                                <li data-bs-dismiss="offcanvas" className="nav-link">
                                    Frases Guardadas
                                    {/* <Link to="/Components/frases-guardadas" className="nav-link">
                                        <i className="bi bi-folder"></i>
                                        Frases Guardadas
                                    </Link> */}
                                </li>
                                <li data-bs-dismiss="offcanvas" className="nav-link" >
                                    Configuración
                                    {/* <Link to="/Components/configuracion" className="nav-link">
                                        <i className="bi bi-gear"></i>
                                        Configuración
                                    </Link> */}
                                </li>
                                <li>
                                    <a href="#" className="nav-link" onClick={logOut}>
                                        <i className="bi bi-box-arrow-right"></i>
                                        Cerrar Sesión
                                    </a>
                                </li>
                            </ul>
                            <div className="text-white">
                                <div className="d-flex align-items-center justify-content-center text-decoration-none mt-5" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i style={{ fontSize: '25px' }} className="bi bi-person-circle"></i>
                                    <strong className="ms-2">USER NAME</strong>
                                    {/* <strong className="ms-2">{this.userData.Alias}</strong> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
