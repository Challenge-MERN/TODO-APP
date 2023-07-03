import { Navigate } from 'react-router-dom';
import { PrincipalPropsI } from "../interfaces/Principal"

const AuthToken = ({ children }: PrincipalPropsI) => {
    
    const token = sessionStorage.getItem('ACCESS_TOKEN') || null;
    if (!token) {
        return <Navigate to='/login' />
    }

    return (
        <>
            {children}
        </>
    )
}

export default AuthToken
