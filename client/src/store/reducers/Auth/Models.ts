export interface IToken {
    token: string
}

export interface IEmail {
    email: string
}

export interface ILogin extends IEmail {
    password: string
}

export interface IConfirmToken extends IEmail, IToken {}

export interface IChangePassword extends IConfirmToken {
    password: string,
    confirmPassword: string
}