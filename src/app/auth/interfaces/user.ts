export interface IUser {
    status: boolean;
    mensaje: string;
    usuario: User;    
}

export interface User{
    email: string;
    password: string;
}