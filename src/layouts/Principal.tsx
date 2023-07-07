import { Navigation } from '../components/navbar/Navbar';
import { PrincipalPropsI } from '../interfaces/Principal';

const Principal = ({ children }: PrincipalPropsI) => {
    return (
        <>
            <div  className='d-flex justify-content-start' >
                <Navigation />
                <div className='w-100 p-5' style={{minWidth: '35rem'}}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Principal;