import { Navigate, useNavigate } from 'react-router-dom';
import { PrincipalPropsI } from "../interfaces/Principal"
import { PATHS } from '../const/Paths';
import { getUserName, logOut } from '../services/users';
import { getPendingTasks } from '../helpers/getPendingTasks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const AuthToken = ({ children }: PrincipalPropsI) => {
    const navigate = useNavigate();
    const userName = getUserName();

    const token = sessionStorage.getItem('ACCESS_TOKEN') || null;
    console.log('estou entradnosd asd alk lsak jfas fasfl ks hflkjs')
    const validToken = async () => {
        if (!token) {
            navigate('/');
        } else {
            try {
                await getPendingTasks(userName);
            } catch (err) {
                Swal.fire({
                    icon: 'info',
                    title: 'Sesión expirada!',
                    text: 'Es necesario volver a iniciar sesión.',
                    allowEnterKey: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: 'blue',
                    confirmButtonText: 'Iniciar Sesión'
                }).then((res) => {
                    if (res.isConfirmed) {
                        logOut();
                        navigate('/');
                    }
                });
            }
        }
    }

    useEffect(() => {
        validToken();
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AuthToken
