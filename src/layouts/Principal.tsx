import { Navigation } from '../components/navbar/Navbar';
import { PrincipalPropsI } from '../interfaces/Principal';

const Principal = ({ children }: PrincipalPropsI) => {
    return (
        <>
            <div className='d-flex justify-content-start'>
                <Navigation />
                <div className='border border-danger w-100 p-5'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Principal;