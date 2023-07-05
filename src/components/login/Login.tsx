/* eslint-disable react-hooks/rules-of-hooks */
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { LoginI, ResponseAuthUserI } from '../../interfaces/User';
import { useState } from 'react';
// import Alert from 'react-bootstrap/Alert';
import { SaveToken } from '../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const api = `${import.meta.env.VITE_API}/user/auth-user`;

  const loginValue: LoginI = {
    UserName: '',
    Password: '',
  }

  const authUser = async (user: string, pass: string) => {
    loginValue.UserName = user;
    loginValue.Password = pass;
    try {
      const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(loginValue),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error HTTP: ' + response.status);
      }

      const data: ResponseAuthUserI = await response.json();
      SaveToken(data.data);
      navigate('/home');
    } catch (err) {
      toast.error('Usuario o Contraseña incorrecto!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log('Catch error: ', err);
    }
  }


  return (
    <div>
      <section id='principal'>
        <div id='form'>
          <form onSubmit={evt => {
            evt.preventDefault();
            authUser(userName, password);
          }} id='formulario'>
            <h4 className='text-center' id='title'>Iniciar Sesión</h4>
            <div id='userName'>
              <label className='mb-1'>Usuario:</label>
              <input
                className='form-control'
                value={userName}
                placeholder='Usuario'
                onChange={ev => setUserName(ev.target.value)}
                type="text"
                required
              />
            </div>
            <div id='pass'>
              <label className='mb-1'>Contraseña:</label>
              <input
                className='form-control'
                value={password}
                placeholder='Contraseña'
                onChange={evt => setPassword(evt.target.value)}
                type="password"
                required
              />
            </div>
            <div id='submit'>
              <button className='ps-5 pe-5 btn btn-outline-success' type='submit'>Confirmar</button>
            </div>
            <div id='sign-up'>
              <p>Aún no tienes una cuenta?</p>
              <Link id='registrate' className='ms-2' to='/sign-up'>Registrate!</Link>
            </div>
            <div id='forgot'>
              <Link id='f-pass' to=''>Olvide mi contraseña!</Link>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </div>
  )
}

export default login;