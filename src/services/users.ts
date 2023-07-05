import { SaveTokenI } from "../interfaces/User";

export const SaveToken = ({ accessToken, expiresIn, name }: SaveTokenI) => {
    sessionStorage.setItem('ACCESS_TOKEN', accessToken);
    sessionStorage.setItem('EXPIRES_IN', expiresIn);
    sessionStorage.setItem('USER', name);
}

export const logOut = () => {
    sessionStorage.removeItem('ACCESS_TOKEN');
    sessionStorage.removeItem('EXPIRES_IN');
    sessionStorage.removeItem('USER');
}

export const getToken = () => {
    const token = sessionStorage.getItem('ACCESS_TOKEN') || '';
    return token;
}

export const getUserName = () => {
    const userName = sessionStorage.getItem('USER') || '';
    return userName;
}