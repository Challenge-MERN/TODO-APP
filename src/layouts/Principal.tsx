import { Navigation } from '../components/navbar/Navbar';
import { PrincipalPropsI } from '../interfaces/Principal';
import './Principal.css';

const Principal = ({ children }: PrincipalPropsI) => {
    return (
        <>
            <div id='principalLayout'>
                <Navigation />
                <div id='childrens'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Principal;