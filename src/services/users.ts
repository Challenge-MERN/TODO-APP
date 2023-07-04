import { SaveTokenI } from "../interfaces/User";

export const SaveToken = ({ accessToken, expiresIn }: SaveTokenI) => {
    sessionStorage.setItem('ACCESS_TOKEN', accessToken);
    sessionStorage.setItem('EXPIRES_IN', expiresIn);
}