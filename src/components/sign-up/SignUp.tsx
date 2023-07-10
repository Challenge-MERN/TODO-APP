import { ToastContainer } from 'react-bootstrap';
import './SignUp.css';
import { useState } from 'react';
import { NewUserI, ResponseAuthUserI, ResponseValidateRegisterI } from '../../interfaces/User';
import { SaveToken } from '../../services/users';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { AppName } from '../AppName';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [showUserError, setShowUserError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const navigate = useNavigate();
  const URL_ROOT = import.meta.env.VITE_API;
  const signUpValue: NewUserI = {
    UserName: '',
    Mail: '',
    Password: ''
  }

  const validateUserName = async () => {
    let response;
    let data: ResponseValidateRegisterI = {
      status: '',
      data: ''
    };
    try {
      response = await fetch(`${URL_ROOT}/user/valid-userName/${userName.trim()}`);
      if (!response.ok) {
        throw new Error('Error HTTP: ' + response.status);
      }
      data = await response.json();
      if (data.status === 'FALSE') {
        setShowUserError(true);
        setUserError(data.data);
      } else
        setShowUserError(false);
    } catch (err) {
      console.log('Catch error: ', err);
    }
    return data.status;
  }

  const validateEmail = async () => {
    let response;
    let data: ResponseValidateRegisterI = {
      status: '',
      data: ''
    };
    try {
      response = await fetch(`${URL_ROOT}/user/valid-email/${email.trim()}`);
      if (!response.ok) {
        throw new Error('Error HTTP: ' + response.status);
      }
      data = await response.json();
      if (data.status === 'FALSE') {
        setShowEmailError(true);
        setEmailError(data.data);
      } else
        setShowEmailError(false);
    } catch (err) {
      console.log('Catch error: ', err);
    }
    return data.status;
  }

  const generatePasswordErrorMessage = () => {
    let errorMessage = '';

    if (!/(?=.*\d)/.test(password)) {
      errorMessage += 'Debe contener al menos un dígito. ';
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errorMessage += 'Debe contener al menos una letra minúscula. ';
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errorMessage += 'Debe contener al menos una letra mayúscula. ';
    }

    if (!/(?=.*[a-zA-Z])/.test(password)) {
      errorMessage += 'Debe contener al menos un carácter alfanumérico. ';
    }

    if (!/.{5,}/.test(password)) {
      errorMessage += 'Debe tener una longitud mínima de 5 caracteres. ';
    }

    return errorMessage.trim();
  };

  const validatePassword = () => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;
    if (password.length <= 5) {
      setPassError('Contraseña inválida!, longitud debe ser mayor a 5 caracteres')
      setShowPassError(true);
      return false;
    } else if (!regex.test(password)) {
      const errorMessage = generatePasswordErrorMessage();
      setPassError(errorMessage);
      setShowPassError(true);
      return false;
    }
    setShowPassError(false);
    return true;
  }

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  }

  const createUser = async (user: string, pass: string, email: string) => {
    const userStatus = await validateUserName();
    const emailStatus = await validateEmail();
    const passStatus = validatePassword();

    if (userStatus === 'FALSE' && emailStatus === 'FALSE') {
      setShowUserError(true);
      setShowEmailError(true);
    } else if (userStatus === 'FALSE' && emailStatus === 'OK') {
      setShowUserError(true);
      setShowEmailError(false);
    } else if (userStatus === 'OK' && emailStatus === 'FALSE') {
      setShowEmailError(true);
      setShowUserError(false);
    } else if (!passStatus) {
      setShowEmailError(true);
    } else {
      setShowUserError(false);
      setShowEmailError(false);
      signUpValue.Mail = email.trim();
      signUpValue.Password = pass.trim();
      signUpValue.UserName = user.trim();
      try {
        const response = await fetch(`${URL_ROOT}/user/create-user`, {
          method: 'POST',
          body: JSON.stringify(signUpValue),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error HTTP: ' + response.status);
        }
        const data: ResponseAuthUserI = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Registro completado!',
          text: '¿Desea ingresar ahora?',
          showConfirmButton: true,
          showCancelButton: true,
          cancelButtonColor: 'red',
          cancelButtonText: 'En otro momento',
          confirmButtonColor: 'green',
          confirmButtonText: 'Vamos!',
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then((res) => {
          if (res.isConfirmed) {
            SaveToken(data.data);
            navigate('/home');
          } else {
            clearForm();
          }
        })
      } catch (err) {
        console.log('Catch error: ', err);
      }
    }
  }

  return (
    <div>
      <section id='principal'>
        <div id='cabecera'>
          <AppName />
        </div>
        <div id='form'>
          <form onSubmit={evt => {
            evt.preventDefault();
            createUser(userName, password, email);
          }} id='formulario'>
            <h4 className='text-center' id='title'>Registrarse</h4>
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
              {
                showUserError && (<span className='text-center text-danger'>{userError}</span>)
              }
            </div>
            <div id='pass'>
              <label className='mb-1 mt-2'>Contraseña:</label>
              <input
                className='form-control'
                value={password}
                placeholder='Contraseña'
                onChange={evt => setPassword(evt.target.value)}
                type="password"
                required
              />
              {
                showPassError && (<span className='text-center text-danger'>{passError}</span>)
              }
            </div>
            <div id='email'>
              <label className='mb-1 mt-2'>Correo electrónico:</label>
              <input
                className='form-control'
                value={email}
                placeholder='ejemplo@ejemplo.com'
                onChange={evt => setEmail(evt.target.value)}
                type="email"
                required
              />
              {
                showEmailError && (<span className='text-center text-danger'>{emailError}</span>)
              }
            </div>
            <div id='submit'>
              <button className='btn btn-outline-info' type='submit'>Registrarse</button>
            </div>
            <div id='sign-in'>
              <p>Ya tienes una cuenta?</p>
              <a id='registrate' className='ms-2' href='/'>Inicia sesión!</a>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
      <section id='background'>
        <div className='air air1'></div>
        <div className='air air2'></div>
        <div className='air air3'></div>
        <div className='air air4'></div>
      </section>
    </div>
  )
}

export default SignUp;
