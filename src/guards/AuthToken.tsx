import { useNavigate } from 'react-router-dom';
import { PrincipalPropsI } from "../interfaces/Principal"
import { getUserName, logOut } from '../services/users';
import { getTasksFetchPetitions } from '../helpers/getTasksFetchPetitions';
import { METHODS } from '../const/Methods';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';


const AuthToken = ({ children }: PrincipalPropsI) => {
    const navigate = useNavigate();
    const userName = getUserName();

    const token = sessionStorage.getItem('ACCESS_TOKEN') || null;

    const validToken = async () => {
        if (!token) {
            navigate('/');
        } else {
            try {
                const method = METHODS.GET;
                const url = `/task/get-pendingTasks/${userName}`;
                const response = await getTasksFetchPetitions({ method, url });
                if (response.status === 'FAILED') {
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
                            window.location.reload();
                        }
                    });
                }
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
                        window.location.reload();
                    }
                });
            }
        }
    }

    validToken();

    return (
        <>
            {children}
        </>
    )
}

export default AuthToken
