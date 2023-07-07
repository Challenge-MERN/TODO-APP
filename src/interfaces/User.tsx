export interface LoginI {
    UserName: string,
    Password: string
}

export interface SaveTokenI {
    accessToken: string,
    expiresIn: string,
    name: string,
    email: string
}

export interface ResponseAuthUserI {
    status: string,
    data: SaveTokenI
}

export interface ResponseValidateRegisterI {
    status: string,
    data: string
}

export interface NewUserI {
    UserName: string,
    Mail: string,
    Password: string
}