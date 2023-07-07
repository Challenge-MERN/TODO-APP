import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../../const/Paths';
import Dropdown from 'react-bootstrap/Dropdown';
import { logOut as logout } from '../../services/users';
import { LayoutWtf, PersonCircle, HouseFill, Clipboard2DataFill, Clipboard2CheckFill, Clipboard2PlusFill, GearFill } from 'react-bootstrap-icons';

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

    const AppName = 'TODO | APP';

    const actualDate = new Date().getFullYear();
    const USER = sessionStorage.getItem('USER');

    const logOut = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <div className="d-flex justify-content-start" style={{ height: '100vh' }}>
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
            </div>
        </>
    )
}
