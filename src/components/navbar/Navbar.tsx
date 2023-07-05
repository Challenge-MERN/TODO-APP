import { useState } from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../../const/Paths';
import Dropdown from 'react-bootstrap/Dropdown';
import { logOut as logout } from '../../services/users';

export const Navigation = () => {
    const navigate = useNavigate();

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

    const AppName = 'TODO | APP';

    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const actualDate = new Date().getFullYear();
    const USER = sessionStorage.getItem('USER');

    const handleOffcanvasToggle = () => {
        setIsOffcanvasOpen((prevState) => !prevState);
    };

    const handleOffcanvasClose = () => {
        setIsOffcanvasOpen(false);
    };

    const logOut = () => {
        logout();
        navigate('/');
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
                        <div className='d-flex justify-content-center'>
                            <Dropdown>
                                <Dropdown.Toggle variant="" className='text-light' style={{ border: 'none' }} id="dropdown-basic">
                                    <strong className='m-5'>{USER}</strong>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to="/create-task" style={{ textDecoration: 'none', color: 'black' }}>Nueva Tarea</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item to="/settings">
                                        <Link to="/settings" style={{ textDecoration: 'none', color: 'black' }}>Configuración</Link>
                                    </Dropdown.Item>
                                    <hr />
                                    <Dropdown.Item onClick={logOut}>Cerrar Sesión</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            {routes.map((route, index) => (
                                <li key={index}>
                                    <Link to={route.path} className="nav-link text-light" aria-current="page" >{route.name}</Link>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <span className="text-center text-secondary pt-2 pb-2" style={{ fontSize: 12 }}>&copy; {actualDate} TODO | APP
                        </span>

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
                            <ul className="nav nav-pills flex-column mb-auto">
                                {routes.map((route, index) => (
                                    <li key={index}>
                                        <Link to={route.path} className="nav-link text-light" aria-current="page" >{route.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
