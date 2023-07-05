import { Navigate, useNavigate } from 'react-router-dom';
import { PrincipalPropsI } from "../interfaces/Principal"
import { PATHS } from '../const/Paths';
import { getUserName, logOut } from '../services/users';
import { getPendingTasks } from '../helpers/getPendingTasks';
import { useEffect } from 'react';

const AuthToken = ({ children }: PrincipalPropsI) => {
    const navigate = useNavigate();
    const userName = getUserName();

    const token = sessionStorage.getItem('ACCESS_TOKEN') || null;

    const validToken = async () => {
        if (!token) {
            return <Navigate to={PATHS.LOGIN} />
        } else {
            try {
                getPendingTasks(userName);
            } catch (err) {
                logOut();
                navigate('/');
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
