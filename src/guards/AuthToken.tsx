import { Navigate } from 'react-router-dom';
import { PrincipalPropsI } from "../interfaces/Principal"
import { PATHS } from '../const/Paths';

const AuthToken = ({ children }: PrincipalPropsI) => {

    const token = sessionStorage.getItem('ACCESS_TOKEN') || null;
    if (!token) {
        return <Navigate to={PATHS.LOGIN} />
    }

    return (
        <>
            {children}
        </>
    )
}

export default AuthToken
