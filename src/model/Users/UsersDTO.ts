export interface SignUpInputDTO {
    fullName: string, 
    email: string,
    password: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface GetProfileInputDTO {
    token: string
}