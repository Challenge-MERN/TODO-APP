import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../../const/Paths';
import Dropdown from 'react-bootstrap/Dropdown';
import { logOut as logout } from '../../services/users';
import {
    LayoutWtf,
    PersonCircle,
    HouseFill,
    Clipboard2DataFill,
    Clipboard2CheckFill,
    Clipboard2PlusFill,
    BoxArrowLeft
} from 'react-bootstrap-icons';
import { useState } from 'react';

export const Navigation = () => {
    const navigate = useNavigate();

    const routes = [
        {
            path: PATHS.HOME,
            name: 'Home',
            icon: <HouseFill />
        },
        {
            path: PATHS.PENDING_TASKS,
            name: 'Tareas Pendientes',
            icon: <Clipboard2DataFill />
        },
        {
            path: PATHS.COMPLETED_TASKS,
            name: 'Tareas Completadas',
            icon: <Clipboard2CheckFill />
        },
        {
            path: PATHS.CREATE_TASK,
            name: 'Nueva Tarea',
            icon: <Clipboard2PlusFill />
        }

    ]

    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleOffcanvasToggle = () => {
        setIsOffcanvasOpen((prevState) => !prevState);
    };

    const handleOffcanvasClose = () => {
        setIsOffcanvasOpen(false);
    };

    const AppName = 'TODO | APP';

    const actualDate = new Date().getFullYear();
    const USER = sessionStorage.getItem('USER');

    const logOut = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <div className="d-flex justify-content-start">
                <div id="slideBar">
                    <div className="d-flex flex-column flex-shrink-0 p-3 text-white h-100" id="menu">
                        <p className="text-center w-100 mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-4"><LayoutWtf /> {AppName}</span>
                        </p>
                        <hr />
                        <div className='d-flex justify-content-center'>
                            <Dropdown>
                                <Dropdown.Toggle variant="" className='text-light' style={{ border: 'none' }} id="dropdown-basic">
                                    <strong className='m-5'><PersonCircle /> {USER}</strong>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <div className='text-center p-1 d-flex flex-column justify-content-center'>
                                        <Link to="/create-task" style={{ textDecoration: 'none', color: 'black' }}>Nueva Tarea</Link>
                                    </div>
                                    <hr />
                                    <Dropdown.Item className='text-center' onClick={logOut}>Cerrar Sesión</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <hr />
                        <ul className="nav nav-pills mb-auto">
                            {routes.map((route, index) => (
                                <li key={index}>
                                    <Link to={route.path} className="nav-link text-light" aria-current="page" >{route.icon} {route.name}</Link>
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
                                <p className="w-100 d-flex justify-content-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                    <span className="fs-4"><LayoutWtf /> {AppName}</span>
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
                                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><LayoutWtf /> {AppName}</h5>
                            </div>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleOffcanvasClose}></button>
                        </div>
                        <hr className='text-light' />
                        <strong className='text-light text-center'><PersonCircle className='mb-1 me-1' /> {USER}</strong>
                        <hr className='text-light' />
                        <div className="offcanvas-body d-flex flex-column">
                            <ul id='ul-nav' className="d-flex flex-column justify-content-between align-items-center navbar-nav fs-5 justify-content-end flex-grow-1">
                                <div>
                                    {routes.map((route, index) => (
                                        <li className='pb-4' key={index}>
                                            <Link to={route.path} className="nav-link text-light" aria-current="page" onClick={handleOffcanvasClose}>{route.icon} {route.name}</Link>
                                        </li>
                                    ))}
                                </div>
                                <li style={{ width: '11rem' }}>
                                    <button className='nav-link text-light d-flex align-items-center w-100 justify-content-evenly' onClick={logOut}><BoxArrowLeft /> Cerrar Sesión</button>
                                </li>
                            </ul>
                            <hr />
                            <div className='text-center'>
                                <span className="text-secondary pt-2 pb-2" style={{ fontSize: 12 }}>&copy; {actualDate} TODO | APP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
